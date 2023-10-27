import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tag from 'components/Tag';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
import navData from 'data/config.json';
import { BellIcon } from '@heroicons/react/24/outline';
import logo from 'assets/images/logo.svg';
import menuIcon from 'assets/images/icon-menu.svg';
import closeIcon from 'assets/images/icon-close.svg';

export default function Nav() {
  /* state */
  const [open, setOpen] = useState(false);

  /* replace with session */
  const location = useLocation();
  const data = location.pathname === '/sign-up' || location.pathname === '/sign-in' ?
    navData.nav.filter(item => !item.private) :
    navData.nav.filter(item => item.private);

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  return (
    <>
      <nav className='main z-10'>
        <div className='md:container flex items-center justify-center w-full'>
          <div className='flex items-center gap-4 grow'>
            <img src={logo} alt="Chest" width={146} height={32} className='w-[110px] h-[24px] md:w-[146px] md:h-[32px]' />
            <Tag>Web</Tag>
          </div>
          <div className='hidden md:block'>
            <ul>
              {
                data.map((item, index) =>
                  <li
                    key={index}
                    className={`${item.button ? 'bg-brand-gold rounded-[10px] px-4 py-[9px]' : ''}`}>
                    <NavLink to={item.link}>
                      {item.name}
                    </NavLink>
                  </li>
                )
              }
              {/* Test */}
              <li>
                <button type='button' className='p-2' onClick={() => { signOut(auth) }}>
                  logout
                </button>
              </li>
              <li className='flex items-center'>
                <a href='/notifications' className='p-1 hover:!text-white text-gray-500'>
                  <BellIcon className='h-6 w-6' />
                </a>
              </li>
            </ul>
          </div>
          <div className='md:hidden'>
            <button type='button' className='p-2' onClick={toggleOpen}>
              {open ?
                <img src={closeIcon} width={24} height={24} alt='' /> :
                <img src={menuIcon} width={24} height={24} alt='' />}
            </button>
          </div>
        </div>
      </nav>
      <motion.div
        className={`absolute top-14 left-0 bg-neutral-black w-full h-auto pt-4 pb-8 ${open ? '' : 'hidden'}`}
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