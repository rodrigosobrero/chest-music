import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ErrorModal(props) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <BaseModal
      title='error'
      description={props.meta.message}
      show={props.isOpen}
      onClose={handleClose}>
      <div className='w-full'>
        <Button
          text={t('global.close')}
          style='primary'
          onClick={handleClose} />
      </div>
    </BaseModal>
  )
}