import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';
import spinner from 'assets/images/icon-loading-claim.png';
import { useEffect, useState } from 'react';


export default function PlayLimitModal({handleClose,timeLeft,setTimeLeft}) {
    const { t } = useTranslation();

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  
  return (
    
    <BaseModal
    title='Antes de ir a Mercado pago...'
    onClose={handleClose}
    >
    <p className='text-neutral-silver-100 pb-8 mw-400px '>Tené en cuenta que para poder abonar con Mercado Pago deberás estar deslogueado o loguearte con el mismo correo de tu nueva cuenta de Chest.</p>
    <div className='w-full'>
    <div className="loading-spinner flex items-center ">
      <img src={spinner} alt='' width={28} height={28} className='animate-spin text-brand-gold mr-3' />
      <div className='text-brand-gold pb-8 mw-400px'>Redirigiendo en: {timeLeft} segundos...</div>
    </div>
    <div>
    </div>
      <Button
        text='Ir ahora'
        style='primary'
        onClick={handleClose} 
        />
      {/* <Button
        text={t('global.close')}
        style='tertiary'
        onClick={handleClose} /> */}
    </div>
  </BaseModal>
  );
}
