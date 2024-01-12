import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateVersionMutation } from 'store/api';

import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';
import Input from 'components/Input';

export default function EditVersionModal(props) {
  const { t } = useTranslation();
  const [updateVersion, { isLoading }] = useUpdateVersionMutation();
  const [version, setVersion] = useState({ name: props.meta.name });

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleSave = async () => {
    const result = await updateVersion({
      id: props.meta.id,
      name: version.name
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  const handleOnChange = (e) => {
    setVersion({ name: e.target.value });
  }

  return (
    <BaseModal title='edit version' show={props.isOpen} onClose={handleClose}>
      <div>
        <Input
          type='text'
          label='Version name'
          required
          value={version.name}
          onChange={handleOnChange} />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text='Save'
          style='primary'
          disabled={isLoading || props.meta.name === version.name || version.name.length === 0}
          loading={isLoading}
          onClick={handleSave} />
      </div>
    </BaseModal>
  )
}