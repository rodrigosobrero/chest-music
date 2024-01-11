import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from 'utils/helpers';
import navData from 'data/config.json';
import { useGetNewNotificationsQuery } from 'store/api';

import Tag from 'components/Tag';
import Button from 'components/Button';

import { BellIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.svg';
import menuIcon from 'assets/images/icon-menu.svg';
import closeIcon from 'assets/images/icon-close.svg';

export default function Nav() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const excludedPaths = ['/sign-in', '/sign-up', '/setup'];

  const { data: notifications } = useGetNewNotificationsQuery({}, {
    pollingInterval: 30000,
    skip: !user?.data.type
  });

  const NewNotification = () => (
    <div className='absolute right-0 top-0'>
      <span class="relative flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-red opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-error-red"></span>
      </span>
    </div>
  )

  useEffect(() => {
    if (user?.token) {
      setData(navData.nav.filter(item => item.private))
      setIsLogged(true);
      return;
    }
    setData(navData.nav.filter(item => !item.private))
  }, [user]);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  return (
    <>
      <nav className='main z-10 fixed w-full'>
        <div className='md:container flex items-center justify-center w-full'>
          <div className={`flex items-center gap-4 grow ${location.pathname === '/setup' && 'justify-center'}`}>
            <img src={logo} alt='Chest' width={146} height={32} className='w-[110px] h-[24px] md:w-[146px] md:h-[32px]' />
            <Tag>Web</Tag>
          </div>
          <div className='hidden lg:block'>
            <ul>
              {location.pathname !== '/setup' &&
                data.map((item) =>
                  <li key={item.name}>
                    {item.button
                      ? <Button style='primary' text={item.name} onClick={() => { navigate('/sign-in') }} />
                      : <NavLink to={item.link}>
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
                          : item.name}
                      </NavLink>
                    }
                  </li>
                )
              }
            </ul>
          </div>
          {location.pathname !== '/setup' &&
            <div className='flex lg:hidden flex-row items-center'>
              {!excludedPaths.includes(location.pathname) && isLogged && (
                <NavLink to='/notifications' className='p-1 relative'>
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
          }
        </div>
      </nav>
      <motion.div
        className={
          classNames({
            'hidden': !open,
            'absolute top-14 left-0 bg-neutral-black w-full h-auto pt-4 pb-8': true
          })
        }
        animate={{ opacity: open ? 1 : 0 }}>
        <ul>
          {
            data.map((item, index) =>
              <li
                key={index}
                className={`${item.button && '!text-brand-gold font-semibold'} px-6 py-3 text-neutral-silver-300 text-[28px] font-normal hover:text-white`}>
                <NavLink to={item.link} onClick={() => { setOpen(false) }}>
                  {item.name}
                </NavLink>
              </li>
            )
          }
        </ul>
      </motion.div>
    </>
  )
}