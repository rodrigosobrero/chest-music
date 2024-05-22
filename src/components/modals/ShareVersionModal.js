import { useTranslation } from 'react-i18next';
import { useCreateLinkMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ShareLinkModal(props) {
  const { t } = useTranslation();
  const [createLink, { isLoading }] = useCreateLinkMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleCancel = () => {
    handleClose();
  }

  const handleConfirm = async () => {
    const result = await createLink({
      version: props.meta.id,
      'allow_web_play': true
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal
      title='share this track version'
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
          onClick={handleCancel} />
        <Button
          text='Confirm'
          style='primary'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleConfirm} />
      </div>
    </BaseModal>
  )
}