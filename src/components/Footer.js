import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo-gray.svg';
import appStore from 'assets/images/icon-appstore.svg';
import playStore from 'assets/images/icon-playstore.svg';
import twitter from 'assets/images/icon-twitter.svg';
import instagram from 'assets/images/icon-instagram.svg';
import linkedin from 'assets/images/icon-linkedin.svg';

import { ReactComponent as AppStore } from 'assets/images/icon-appstore.svg';
import { ReactComponent as PlayStore } from 'assets/images/icon-playstore.svg';
import { ReactComponent as Twitter } from 'assets/images/icon-twitter.svg';
import { ReactComponent as Instagram } from 'assets/images/icon-instagram.svg';
import { ReactComponent as LinkedIn } from 'assets/images/icon-linkedin.svg';

export default function Footer() {
  const data = require('data/config.json');
  const { i18n, t } = useTranslation();

  const handleChange = event => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <>
      <footer>
        <div className='container flex md:flex-row flex-col items-center w-full'>
          <div className='flex flex-col items-center md:items-start gap-3 grow order-last md:order-1'>
            <img src={logo} alt="" width={146} height={32} />
            <span>© 2023 - Chest. {t('footer.rights')}</span>
          </div>
          <div className='flex flex-col items-center md:flex-row md:divide-x divide-neutral-silver-600 gap-7 order-1 md:order-last'>
            <div className='flex items-center gap-4'>
              <a href='https://www.apple.com' className='social hover:fill-brand-gold'>
                {/* <img src={appStore} alt='App Store' width={24} height={24} /> */}
                <AppStore fill='currentColor' />
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
            <div className='flex items-center pb-10 md:pb-0 md:pl-7'>
              <select defaultValue={i18n.language} onChange={handleChange}>
                {
                  data.language.map(
                    (option, index) => <option key={index} value={option.code}>
                      {option.icon}
                    </option>
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