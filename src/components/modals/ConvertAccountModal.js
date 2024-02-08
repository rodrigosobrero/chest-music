import { useTranslation } from 'react-i18next';
import { useGetUpdateAccountMutation, useLazyGetUpdateAccountMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ErrorModal(props) {
  const { t } = useTranslation();
  const [updateAccount, { isLoading }] = useGetUpdateAccountMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleConvertAccount = async () => {
    const result = await updateAccount();

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
      window.location.reload();
    }
  }

  return (
    <BaseModal
      title={t('global.become an artist')}
      show={props.isOpen}
      onClose={handleClose}>
      <div>
        <p className='text-neutral-silver-200 font-light'>
          {t('global.become.description')}
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.confirm')}
          style='primary'
          disabled={isLoading}
          loading={isLoading}
          onClick={handleConvertAccount} />
      </div>
    </BaseModal>
  )
}