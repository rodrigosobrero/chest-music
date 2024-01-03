import { useTranslation } from 'react-i18next';
import { useGetRestoreTrashMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function RestoreTrashModal(props) {
  const { t } = useTranslation();
  const [restoreTrash, { isLoading }] = useGetRestoreTrashMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleRestore = async () => {
    const result = await restoreTrash(props.meta.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal
      title='rrestore version'
      description='Are you sure you want to move this version to your chest?'
      show={props.isOpen}
      onClose={handleClose}>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text='Restore'
          style='primary'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleRestore} />
      </div>
    </BaseModal>
  )
}