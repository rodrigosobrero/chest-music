import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { format } from 'utils/helpers'; 
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AccountSuspension({ expiration, status }) {
  const { t } = useTranslation();

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col lg:flex-row gap-6 items-center bg-brand-gold px-5 p-3 rounded-2xl w-fit max-w-[770px]'>
        <div className='flex items-center gap-4'>
          <ExclamationCircleIcon class='h-8 w-8 text-neutral-black hidden lg:block' />
          <div className='flex flex-col'>
            <span className='lg:text-lg font-bold text-neutral-black text-center lg:text-left'>
              {status === 'canceled' ? (
                <>{t('account.suspended_title')} {format.dateDdMmYyyy(expiration)}</>
              ) : (
                <>{t('account.ended_title')}</>
              )}
            </span>
            <span className='text-sm text-neutral-black text-center lg:text-left'>{t('account.suspended_description')}</span>
          </div>
        </div>
        <Link
          to='/profile/account/subscription/plan'
          className='bg-neutral-silver-600 text-lg font-bold px-5 py-3 rounded-xl w-full lg:w-fit text-center'>
          {t('account.choose_plan')}
        </Link>
      </div>
    </div>
  );
}