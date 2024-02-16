import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function PlayLimitModal(props) {
  const { t } = useTranslation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <BaseModal
      title='no more plays available'
      show={props.isOpen}
      onClose={handleClose}>
      <p className='text-neutral-silver-300 pb-8'>The artist that shared this track with you limited the amount of plays, and there are no more plays available. Try asking the artist to share this track again.</p>
      <div className='w-full'>
        <Button
          text={t('global.close')}
          style='tertiary'
          onClick={handleClose} />
      </div>
    </BaseModal>
  )
}