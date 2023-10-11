import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from 'utils/connection';

import Input from 'components/Input';
import Button from 'components/Button';

import google from 'assets/images/logo-google.png';

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full'>
        <div className='flex flex-col gap-6 text-center justify-center px-6 pt-10 pb-10 md:px-[120px] md:py-20 order-last md:order-1'>
          <h2 className='text-center'>{t('signin.title')}</h2>
          <button type='button' className='flex items-center justify-center text-lg gap-3 bg-neutral-black rounded-xl w-full px-5 py-3'>
            <img src={google} alt='Google' width={32} height={32} />
            {t('signin.button_google')}
          </button>
          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-neutral-silver-500"></div>
            <span className="flex-shrink mx-6 font-bureau-grotesque-extended">{t('global.divider')}</span>
            <div className="flex-grow border-t border-neutral-silver-500"></div>
          </div>
          <div className='flex flex-col gap-4'>
            <Input type='email' label='Email' placeholder={t('global.write_here')} />
            <Input type='password' label={t('global.password')} placeholder={t('global.write_here')} showHide={true} />
          </div>
          <Button text={t('signin.button')} type='primary' disabled={true} />
          <NavLink to='/sign-up' className='text-brand-gold font-semibold text-lg'>
            {t('signin.signup')}
          </NavLink>
          <NavLink to='/sign-up' className='text-brand-uva font-normal'>
            {t('signin.reset')} <span className='underline'>{t('global.click_here')}</span>
          </NavLink>
        </div>
        <div className='signin-cover'></div>
      </div>
    </>
  )
}