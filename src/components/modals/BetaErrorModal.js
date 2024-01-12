import { useTranslation } from 'react-i18next';
import { Link, redirect } from 'react-router-dom';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ErrorModal(props) {
  const { t } = useTranslation();

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
          {t('signin.beta.modal.description')} <a href='/' className='text-brand-gold underline'>{t('global.contact_us')}</a>.
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.close')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('signin.beta.modal.signup_button')}
          style='primary'
          onClick={() => { redirect('/') }} />
      </div>
    </BaseModal>
  )
}