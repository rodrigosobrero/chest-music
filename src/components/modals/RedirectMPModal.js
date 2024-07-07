import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';
import spinner from 'assets/images/icon-loading-claim.png';
import { useEffect } from 'react';


export default function PlayLimitModal({handleClose,timeLeft,setTimeLeft, handleConfirm, redirect}) {
    const { t } = useTranslation();

  useEffect(() => {
    if(redirect){
        if (timeLeft === 0) handleConfirm();
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }
  }, [timeLeft, redirect]);
  
  return (
    
    <BaseModal
    title='Antes de ir a Mercado pago...'
    onClose={handleClose}
    >
    <p className='text-neutral-silver-100 pb-8 mw-400px '>Tené en cuenta que para poder abonar con Mercado Pago deberás estar deslogueado o loguearte con el mismo correo de tu nueva cuenta de Chest.</p>
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
      <div className='text-brand-gold pb-8 mw-400px mt-0.5'>Redirigiendo en: {timeLeft} segundos...</div>
    </div>
    <div>
    </div>
      <Button
        text='Ir ahora'
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
