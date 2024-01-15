import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ErrorModal(props) {
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <BaseModal
      title={t('signin.beta.modal.title')}
      show={props.isOpen}
      onClose={handleClose}>
      <div>
        <p className='text-neutral-silver-200 font-light'>
          {t('signin.beta.modal.description')}
          <a
            href={`${process.env['REACT_APP_FEEDBACK_FORM_' + i18n.language.toUpperCase()]}`}
            className='text-brand-gold underline ml-1'>{t('global.contact_us')}</a>.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.close')}
          style='tertiary'
          onClick={handleClose} />
        <a href={`https://chestmusic.com/${i18n.language === 'en' ? 'en' : ''}`} role='button' className='btn btn-primary'>
          {t('signin.beta.modal.signup_button')}
        </a>
      </div>
    </BaseModal>
  )
}