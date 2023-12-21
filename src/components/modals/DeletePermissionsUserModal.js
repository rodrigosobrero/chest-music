import { useTranslation } from 'react-i18next';
import { useDeleteSharedUserMutation } from 'store/api';

import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DeletePermissionsUserModal(props) {
  const { t } = useTranslation();
  const [deleteUserPermissions, { isLoading }] = useDeleteSharedUserMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleCancel = () => {
    handleClose();
  }

  const handleRemove = async () => {
    const result = await deleteUserPermissions(props.meta.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <>
      <BaseModal
        title='delete user permissions'
        description={props.meta.full_name}
        show={props.isOpen}
        onClose={handleClose}>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style={'third'}
            onClick={handleCancel} />
          <Button
            text='Remove'
            style={'error'}
            disabled={isLoading}
            loading={isLoading}
            onClick={handleRemove} />
        </div>
      </BaseModal>
    </>
  )
}