import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';
import spinner from 'assets/images/icon-loading-claim.png';
import { useEffect } from 'react';


export default function RedirectMPModal({handleClose,timeLeft,setTimeLeft, handleConfirm, redirect}) {
    const { t } = useTranslation();

    useEffect(() => {
      if (redirect) {
        if (timeLeft === 0) {
          handleConfirm();
        } else {
          const intervalId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
              if (prevTimeLeft <= 1) {
                clearInterval(intervalId);
                return 0;
              }
              return prevTimeLeft - 1;
            });
          }, 1000);
          return () => clearInterval(intervalId);
        }
      }
    }, [timeLeft, redirect]);
  
  return (
    
    <BaseModal
    title={t('global.mp_modal.title')}
    onClose={handleClose}
    >
    <p className='text-neutral-silver-100 pb-8 mw-400px '>{t('global.mp_modal.subtitle')}</p>
    <div className='w-full'>
    <div className="loading-spinner flex justify-center">
    <svg
        className="animate-spin text-brand-gold mr-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="28"
        height="28"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          strokeDasharray="251.2"
          strokeDashoffset="62.8"
        />
      </svg>
      <div className='text-brand-gold pb-8 mw-400px mt-0.5'>{t('global.mp_modal.timeLeft',{timeLeft:timeLeft})}</div>
    </div>
    <div>
    </div>
      <Button
        text={t('global.mp_modal.button')}
        style='primary'
        onClick={handleConfirm} 
        />
        <div className='h-2'></div>
      <Button
        text={t('global.close')}
        style='tertiary'
        onClick={handleClose} />
    </div>
  </BaseModal>
  );
}
