import { useTranslation } from 'react-i18next';
import { useDeleteVersionMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DeleteVersionModal(props) {
  const { t } = useTranslation();
  const [deleteVersion, { isLoading }] = useDeleteVersionMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleDelete = async () => {
    const result = await deleteVersion(props.meta.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <>
      <BaseModal
        title='move to trash can'
        description='Are you sure you want to move this version to the Trash Can? It will be deleted in 30 days.'
        show={props.isOpen}
        onClose={handleClose}>
        <div className='flex flex-col items-center'>
          <div className='bg-black rounded-full px-3 py-1.5'>
            {props.meta.version??props.meta.name}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='tertiary'
            onClick={handleClose} />
          <Button
            text='Move to trash'
            style='primary'
            disabled={isLoading}
            loading={isLoading}
            onClick={handleDelete} />
        </div>
      </BaseModal>
    </>
  )
}