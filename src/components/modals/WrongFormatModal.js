import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function WrongFormatModal(props) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <BaseModal
      title={t('upload.wrong_format')}
      show={props.isOpen}
      onClose={handleClose}>
      <div>
        <p className='text-neutral-silver-200 text-lg mb-8'>
          {t('upload.wrong_format_description')}
        </p>
      </div>
      <div className='flex justify-center'>
        <div className='w-1/3'>
          <Button text='Close' style='tertiary' onClick={handleClose} />
        </div>
      </div>
    </BaseModal>
  )
}