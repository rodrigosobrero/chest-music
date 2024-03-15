import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetNewNotificationsQuery } from 'store/api';
import { useTranslation } from 'react-i18next';
import { useModal } from 'hooks/useModal';
import { classNames } from 'utils/helpers';

import Tag from 'components/Tag';
import Button from 'components/Button';

import { BellIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.svg';
import menuIcon from 'assets/images/icon-menu.svg';
import closeIcon from 'assets/images/icon-close.svg';

export default function Nav() {
  const { nav } = require('data/config.json');
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const { onOpen: openFeedbackModal } = useModal('FeedbackModal');
  const { onOpen: openConvertAccountModal } = useModal('ConvertAccountModal');
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const excludedPaths = ['/sign-in', '/sign-up', '/setup'];

  const { data: notifications } = useGetNewNotificationsQuery({}, {
    pollingInterval: 30000,
    skip: !user?.data?.type
  });

  const NewNotification = () => (
    <div className='absolute right-2 lg:right-0 top-2 lg:top-0'>
      <span className='relative flex h-2.5 w-2.5'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-error-red opacity-75'></span>
        <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-error-red'></span>
      </span>
    </div>
  )

  useEffect(() => {
    if (user && user.token && user.data) {
      const filter = nav
        .filter(item => item.private)
        .filter(item => item.role === user.data.type || !item.role);

      setNavLinks(filter);
      setIsLogged(true);
    } else {
      setNavLinks(nav.filter(link => !link.private));
    }
  }, [user, nav]);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  const actions = {
    openFeedbackModal,
    openConvertAccountModal
  }

  return (
    <>
      <nav className='main z-10 fixed w-full'>
        <div className='md:container flex items-center justify-center w-full'>
          <div className={`flex items-center gap-4 grow ${location.pathname === '/setup' && 'justify-center'}`}>
            <Link to={'/my-chest'}>
              <img src={logo} alt='Chest' width={146} height={32} className='w-[110px] h-[24px] md:w-[146px] md:h-[32px]' />
            </Link>
            <Tag>Beta</Tag>
          </div>
          <div className='hidden lg:block'>
            <ul>
              {location.pathname !== '/setup' &&
                navLinks.map((item) =>
                  <li key={item.name}>
                    {item.button ? (
                      <Button
                        style={item.type}
                        text={t('global.' + item.name).toLowerCase()}
                        onClick={() => { item.link ? navigate(item.link) : actions[item.action]() }} />
                    ) : (
                      <NavLink to={item.link.language ? item.link.language[i18n.language] : item.link}>
                        {item.name === 'notifications'
                          ? <div className='relative'>
                            <AnimatePresence>
                              {notifications?.new_notifications > 0 &&
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}>
                                  <NewNotification />
                                </motion.div>
                              }
                            </AnimatePresence>
                            <BellIcon className='h-6 w-6' />
                          </div>
                          : t('global.' + item.name)
                        }
                      </NavLink>
                    )}
                  </li>
                )
              }
            </ul>
          </div>
          <div className='flex lg:hidden flex-row items-center'>
            {!excludedPaths.includes(location.pathname) && isLogged && (
              <NavLink to='/notifications' className='p-2 relative'>
                <AnimatePresence>
                  {notifications?.new_notifications > 0 &&
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <NewNotification />
                    </motion.div>
                  }
                </AnimatePresence>
                <BellIcon className='h-6 w-6' />
              </NavLink>
            )}
            <button type='button' className='p-2' onClick={toggleOpen}>
              {open ?
                <img src={closeIcon} width={24} height={24} alt='' /> :
                <img src={menuIcon} width={24} height={24} alt='' />}
            </button>
          </div>
        </div>
      </nav>
      <motion.div
        className={
          classNames({
            'hidden': !open,
            'fixed top-14 left-0 bg-neutral-black w-full h-auto pt-4 pb-8 z-50': true
          })
        }
        animate={{ opacity: open ? 1 : 0 }}>
        <ul>
          {
            navLinks.map((item) =>
              <li
                key={item.name}
                className={classNames({
                  'px-6 py-3 text-[28px] font-normal hover:text-white': true,
                  'text-neutral-silver-300': !item.button,
                  'text-brand-gold font-semibold': item.button
                })}>
                {item.button ? (
                  <Button
                    text={t('global.' + item.name).toLowerCase()}
                    onClick={() => { item.link ? navigate(item.link) : actions[item.action](); setOpen(false); }} />
                ) : (
                  <NavLink to={item.link} onClick={() => { setOpen(false) }}>
                    {t('global.' + item.name)}
                  </NavLink>
                )}
              </li>
            )
          }
        </ul>
      </motion.div>
    </>
  )
}