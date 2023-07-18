import { NavLink, useLocation } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import bell from 'assets/images/icon-bell.svg';
import Tag from 'components/Tag';
import navData from 'data/config.json';

export default function Nav() {
  /* replace with session */
  const location = useLocation();
  const signed = !location.pathname === '/sign-up' || !location.pathname === '/sign-in';
  const data = location.pathname === '/sign-up' || location.pathname === '/sign-in' ?
    navData.nav.filter(item => !item.private) :
    navData.nav.filter(item => item.private);

  return (
    <>
      <nav className='main'>
        <div className='max-w-7xl flex items-center justify-center w-full'>
          <div className='flex items-center gap-4 grow'>
            <img src={logo} alt="Chest" width={146} height={32} />
            <Tag>Web</Tag>
          </div>
          <div>
            <ul>
              {
                data.map((item, index) =>
                  <li
                    key={index}
                    className={`${item.button && 'bg-brand-gold rounded-[10px] px-4 py-[9px]'}`}>
                    <NavLink to={item.link}>
                      {item.name}
                    </NavLink>
                  </li>
                )
              }
              {signed &&
                <li className='flex items-center'>
                  <a href="/notifications">
                    <img src={bell} alt="" width={24} height={24} />
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}