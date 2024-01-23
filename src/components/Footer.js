import { useTranslation } from 'react-i18next';
import Select from './Select';

import logo from 'assets/images/logo-gray.svg';

import { ReactComponent as AppStore } from 'assets/images/icon-appstore.svg';
import { ReactComponent as PlayStore } from 'assets/images/icon-playstore.svg';
import { ReactComponent as Twitter } from 'assets/images/icon-twitter.svg';
import { ReactComponent as Instagram } from 'assets/images/icon-instagram.svg';
import { ReactComponent as LinkedIn } from 'assets/images/icon-linkedin.svg';

export default function Footer() {
  const { languages } = require('data/config.json');
  const { i18n, t } = useTranslation();
  const date = new Date();
  const currentYear = date.getFullYear();

  const handleChange = event => {
    i18n.changeLanguage(event.target.value);
  }

  const options = () => {
    let list = [];

    languages.map(lang => {
      list.push({ label: lang.icon, value: lang.code })
    });

    return list;
  }

  return (
    <>
      <footer>
        <div className='container flex md:flex-row flex-col items-center w-full'>
          <div className='flex flex-col items-center md:items-start gap-3 grow order-last md:order-1'>
            <img src={logo} alt="" width={146} height={32} />
            <span>© {currentYear} - Chest. {t('footer.rights')}</span>
          </div>
          <div className='flex flex-col items-center md:flex-row md:divide-x divide-neutral-silver-600 gap-7 order-1 md:order-last'>
            <div className='flex items-center gap-4'>
              {/*
              <a href='https://www.apple.com' target='_blank' className='social'>
                <AppStore fill='currentColor' width={24} height={24} />
              </a>
              <a href='https://google.com' target='_blank' className='social'>
                <PlayStore fill='currentColor' width={24} height={24} />
              </a>
              */}
              <a href='https://www.linkedin.com/company/chestmusic/' target='_blank' className='social'>
                <LinkedIn fill='currentColor' width={24} height={24} />
              </a>
              <a href='https://twitter.com/chestmusic' target='_blank' className='social'>
                <Twitter fill='currentColor' width={22} height={22} />
              </a>
              <a href='https://www.instagram.com/chestmusic.app/' target='_blank' className='social'>
                <Instagram fill='currentColor' width={24} height={24} />
              </a>
            </div>
            <div className='flex items-center pb-10 md:pb-0 md:pl-7'>
              <Select
                position='top'
                options={options()}
                value={i18n.language}
                onChange={handleChange}
                minify
              />
              {/* <select defaultValue={i18n.language} onChange={handleChange}>
                {
                  data.language.map(
                    (option, index) => <option key={index} value={option.code}>
                      {option.icon}
                    </option>
                  )
                }
              </select> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}