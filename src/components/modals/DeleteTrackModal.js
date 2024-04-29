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
      title={t('mychest.remove_track.title')}
      description={t('mychest.remove_track.subtitle')}
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
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.remove')}
          style='error'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleOnConfirm} />
      </div>
    </BaseModal>
  )
}