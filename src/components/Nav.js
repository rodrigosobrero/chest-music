import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from 'utils/firebase';
import { classNames } from 'utils/helpers';
import { saveUser } from 'app/auth';
import { apiSlice } from 'store/api';
import navData from 'data/config.json';
import Tag from 'components/Tag';
import Button from 'components/Button';

import { BellIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.svg';
import menuIcon from 'assets/images/icon-menu.svg';
import closeIcon from 'assets/images/icon-close.svg';

export default function Nav() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const excludedPaths = ['/sign-in', '/sign-up', '/setup'];
  
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

  const handleLogOut = () => {
    auth.signOut(); 
    dispatch(apiSlice.util.resetApiState()); 
    dispatch(saveUser(undefined));
  }

  return (
    <>
      <nav className='main z-10 fixed w-full'>
        <div className='container flex items-center justify-center w-full'>
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
                          ? <BellIcon className='h-6 w-6' />
                          : item.name}
                        </NavLink>
                    }
                  </li>
                )
              }
              {!excludedPaths.includes(location.pathname) && isLogged && (
                <li>
                  <button type='button' onClick={handleLogOut}>
                    logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          {location.pathname !== '/setup' &&
            <div className='flex lg:hidden flex-row items-center'>
              <NavLink to='/notifications' className='p-1'>
                <BellIcon className='h-6 w-6' />
              </NavLink>
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
                <NavLink to={item.link}>
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