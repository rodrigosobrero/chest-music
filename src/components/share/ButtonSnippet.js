import { classNames } from 'utils/helpers';
import spinner from 'assets/images/icon-loading-claim.png';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Button({ type = 'button', style, text, onClick, disabled, loading, customStyle, form, textStyle, countdown }) {
    const [currentCountdown,setCurrentCountdown] = useState(15)
    const { t } = useTranslation() 
    useEffect(() => {
        if (loading) {
          setCurrentCountdown(15); // Reinicia el contador cuando loading es true
          const timer = setInterval(() => {
            setCurrentCountdown(prevCountdown => {
              if (prevCountdown <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prevCountdown - 1;
            });
          }, 1000); // Intervalo de 2 segundos
    
          return () => clearInterval(timer); // Limpiar el intervalo cuando se desmonta el componente
        }
      }, [loading]);

    return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        form={form}
        className={classNames({
          'btn btn-primary': style === 'primary',
          'btn btn-secondary': style === 'secondary',
          'btn btn-tertiary': style === 'tertiary',
          'btn btn-error ': style === 'error',
          
        }) + customStyle}>
        {loading ?
        <>
          <img src={spinner} alt='' width={20} height={20} className='animate-spin' />
            <span className='ml-3'>{currentCountdown} seg {t('global.remaining')}</span>...
        </>
          :
          <span className={textStyle}>{text}</span>
        }
      </button>
    </>
  )
}