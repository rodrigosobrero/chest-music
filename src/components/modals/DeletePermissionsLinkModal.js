import { useTranslation } from 'react-i18next';
import { useDeleteLinkMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DeletePermissionsLinkModal(props) {
  const { t } = useTranslation();
  const [deleteLink, { isLoading }] = useDeleteLinkMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleRemove = async () => {
    const result = await deleteLink(props.meta.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal title='remove link' show={props.isOpen} onClose={handleClose}>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style={'tertiary'}
          onClick={handleClose} />
        <Button
          text='Remove'
          style={'primary'}
          disabled={isLoading}
          loading={isLoading}
          onClick={handleRemove} />
      </div>
    </BaseModal>
  )
} 