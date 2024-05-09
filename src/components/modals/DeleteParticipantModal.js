import { useTranslation } from 'react-i18next';
import { useDeleteParticipantMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DeleteParticipantModal(props) {
  const { t } = useTranslation();
  const [deleteParticipant, { isLoading }] = useDeleteParticipantMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleRemove = async () => {
    const result = await deleteParticipant({
      id: props.meta.relation_id, 
      role: props.meta.role
    });

    if ('error' in result) {
      console.log('Error')
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal title='remove from track' show={props.isOpen} onClose={handleClose}>
      <div>
        <p className='text-white text-lg'>
          {props.meta.full_name} <span className=' text-neutral-silver-300'>@{props.meta.username}</span>
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.remove')}
          style='error'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleRemove} />
      </div>
    </BaseModal>
  )
}