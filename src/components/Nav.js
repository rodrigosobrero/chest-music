import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
import { classNames } from 'utils/helpers';
import navData from 'data/config.json';
import Tag from 'components/Tag';
import { apiSlice } from 'store/api';
import { BellIcon } from '@heroicons/react/24/outline';

import logo from 'assets/images/logo.svg';
import menuIcon from 'assets/images/icon-menu.svg';
import closeIcon from 'assets/images/icon-close.svg';
import Button from './Button';
import { saveUser } from 'app/auth';

export default function Nav() {
  const user = useSelector((state) => state.auth.user)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const excludedPaths = ['/sign-in', '/sign-up', '/setup'];
  const dispatch = useDispatch()
  
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
        <div className='container flex items-center justify-center w-full'>
          <div className={`flex items-center gap-4 grow ${location.pathname === '/setup' && 'justify-center'}`}>
            <img src={logo} alt='Chest' width={146} height={32} className='w-[110px] h-[24px] md:w-[146px] md:h-[32px]' />
            <Tag>Web</Tag>
          </div>
          <div className='hidden lg:block'>
            <ul>
              {location.pathname !== '/setup' &&
                data.map((item, index) =>
                  <li
                    key={index}
                    className={classNames({
                      'bg-brand-gold rounded-[10px] px-4 py-[9px]': item.button
                    })}>
                    <NavLink to={item.link} className={classNames({ '!text-black font-semibold': item.button })}>
                      {item.name}
                    </NavLink>
                  </li>
                )
              }
              {!excludedPaths.includes(location.pathname) && isLogged && (
                <li>
                  <button type='button' onClick={() => { signOut(auth); dispatch(apiSlice.util.resetApiState()); dispatch(saveUser(undefined))}}>
                    logout
                  </button>
                </li>
              )}
              {location.pathname !== '/setup' &&
                <li className='flex items-center'>
                  <NavLink to='/notifications' className='p-1'>
                    <BellIcon className='h-6 w-6' />
                  </NavLink>
                </li>
              }
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