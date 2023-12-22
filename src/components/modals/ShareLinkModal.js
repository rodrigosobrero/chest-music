import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateLinkMutation } from 'store/api';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function ShareLinkModal(props) {
  const { t } = useTranslation();
  const [version, setVersion] = useState('');
  const [createLink, { isLoading }] = useCreateLinkMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnChange = (e) => {
    setVersion(e.target.value);
  }

  const handleCancel = () => {
    handleClose();
  }

  const handleConfirm = async () => {
    const result = await createLink({
      version,
      'allow_web_play': true
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      setVersion('');
      handleClose();
    }
  }

  return (
    <BaseModal
      title='choose version'
      description='Choose a version of this track to share'
      show={props.isOpen}
      onClose={handleClose}>
      <div className='version-options'>
        {
          props.meta.project.versions && (
            props.meta.project.versions.map((version) =>
              <>
                <div className='relative'>
                  <input
                    key={version.id}
                    type='radio'
                    id={version.id}
                    value={version.id}
                    name='plan'
                    onChange={handleOnChange} />
                  <label htmlFor={version.id}>
                    <span className='text-lg'>{version.name}</span>
                  </label>
                </div>
              </>
            ))
        }
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleCancel} />
        <Button
          text='Confirm'
          style='primary'
          disabled={isLoading || !version}
          loading={isLoading}
          onClick={handleConfirm} />
      </div>
    </BaseModal>
  )
}