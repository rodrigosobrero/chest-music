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
      title={'wrong format'}
      show={props.isOpen}
      onClose={handleClose}>
      <div>
        <p className='text-neutral-silver-200 text-lg mb-8'>
          The file you uploaded isn’t .wav or .mp3, please try again with the correct file format.
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