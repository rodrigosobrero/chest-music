import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import upgradeCard from 'assets/images/upgrade-plan-card.svg';

export default function UpgradeStorage(props) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <BaseModal
      show={props.isOpen}
      onClose={handleClose}>
      <button 
        type='button' 
        className='p-2 absolute top-5 right-5'
        onClick={handleClose}>
        <XMarkIcon className="h-6 w-6 text-neutral-100" />
      </button>
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 gap-10'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-[60px]' style={{ 'lineHeight': 'normal' }}>{t('account.modals.upgrade_plan')}</h1>
            <p className='text-left mb-8'>{t('account.modals.subscribe')}</p>
            <a
              className='btn btn-primary !w-fit'
              href="/profile/account/subscription/plan">
              {t('account.modals.button')}
            </a>
          </div>
          <div>
            <img src={upgradeCard} alt='' height={307} className='h-full min-h-[307px]' />
          </div>
        </div>
      </div>
    </BaseModal>
  )
}
