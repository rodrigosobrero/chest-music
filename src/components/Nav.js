import { NavLink } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import bell from 'assets/images/icon-bell.svg';
import Tag from 'components/Tag';

export default function Nav() {
  const data = require('../data/config.json');

  return (
    <>
      <nav>
        <div className='max-w-7xl flex items-center justify-center w-full'>
          <div className='flex items-center gap-4 grow'>
            <img src={logo} alt="Chest" width={146} height={32} />
            <Tag>Web</Tag>
          </div>
          <div>
            <ul>
              {
                data.nav.map((item, index) =>
                  <li key={index}>
                    <NavLink to={item.link}>
                      {item.name}
                    </NavLink>
                  </li>)
              }
              <li className='flex items-center'>
                <a href="/notifications">
                  <img src={bell} alt="" width={24} height={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}