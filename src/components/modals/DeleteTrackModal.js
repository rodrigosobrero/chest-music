import { useDeleteProjectMutation } from 'store/api';
import { useTranslation } from 'react-i18next';

import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DeleteTrackModal(props) {
  const { t } = useTranslation();
  const [deleteProject, {isLoading}] = useDeleteProjectMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnConfirm = async () => {
    const result = await deleteProject(props.meta.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal 
      title='delete track' 
      description='Are you sure you want to delete this track? This action can’t be undone.'
      show={props.isOpen} 
      onClose={handleClose}>
      <div className='flex justify-center'>
        <div className='rounded-full bg-neutral-black px-3 py-1.5 text-neutral-silver-200'>
          {props.meta.name}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='third'
          onClick={handleClose} />
        <Button
          text='Confirm'
          style='error'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleOnConfirm} />
      </div>
    </BaseModal>
  )
}