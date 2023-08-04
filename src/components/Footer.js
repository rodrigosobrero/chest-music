import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo-gray.svg';
import appStore from 'assets/images/icon-appstore.svg';
import playStore from 'assets/images/icon-playstore.svg';
import twitter from 'assets/images/icon-twitter.svg';
import instagram from 'assets/images/icon-instagram.svg';
import linkedin from 'assets/images/icon-linkedin.svg';

export default function Footer() {
  const data = require('data/config.json');
  const { i18n } = useTranslation();

  const handleChange = event => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <>
      <footer>
        <div className='flex max-w-7xl w-full'>
          <div className='flex flex-col gap-3 grow'>
            <img src={logo} alt="" width={146} height={32} />
            <span>© 2023 - Chest. All rights reserved.</span>
          </div>
          <div className='flex divide-x divide-neutral-silver-600 gap-7'>
            <div className='flex items-center gap-4'>
              <a href='https://www.apple.com' className='social'>
                <img src={appStore} alt='App Store' width={24} height={24} />
              </a>
              <a href='https://google.com' className='social'>
                <img src={playStore} alt='Play Store' width={24} height={24} />
              </a>
              <a href='https://linkedin.com' className='social'>
                <img src={linkedin} alt='LinkedIn' width={24} height={24} />
              </a>
              <a href='https://twitter.com' className='social'>
                <img src={twitter} alt='Twitter' width={24} height={24} />
              </a>
              <a href='https://instagram.com' className='social'>
                <img src={instagram} alt='Instagram' width={24} height={24} />
              </a>
            </div>
            <div className='flex items-center pl-7'>
              <select defaultValue={i18n.language} onChange={handleChange}>
                {
                  data.language.map(
                    (option, index) => <option key={index} value={option.code}>{option.icon}</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}