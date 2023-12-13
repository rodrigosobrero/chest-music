import { useState } from 'react';
import { useCreateVersionMutation } from 'store/api';
import { useTranslation } from 'react-i18next';

import { BaseModal } from 'components/BaseModal';
import Uploader from 'components/Uploader';
import Input from 'components/Input';
import Button from 'components/Button';

export default function UploadVersionModal(props) {
  const { t } = useTranslation();
  const [createVersion, { isLoading }] = useCreateVersionMutation();
  const [version, setVersion] = useState({
    name: '',
    file: ''
  });

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnNameChange = (e) => {
    setVersion({
      ...version,
      name: e.target.value
    });
  }

  const handleOnFileChange = (e) => {
    setVersion({
      ...version,
      file: e.target.value
    });
  }

  const handleOnConfirm = async () => {
    const data = {
      project: props.meta.id,
      name: version.name,
      audio: version.file
    }

    const result = await createVersion(data);

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal title='add new version' show={props.isOpen} onClose={handleClose}>
      <div className='flex flex-col items-center text-center mb-8'>
        <p className='text-white'>
          {props.meta.name}
        </p>
        <p className='!text-sm text-neutral-silver-200'>
          {props.meta.participants?.map((participant, index) => (index ? ', ' : '') + participant.full_name)}
        </p>
      </div>
      <div className='flex flex-col gap-8'>
        <Uploader
          self
          id={handleOnFileChange} />
        <Input
          type='text'
          label='Version name'
          value={version.name}
          onChange={handleOnNameChange}
          helper='Must be different from previous.' />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='third'
          onClick={handleClose} />
        <Button
          text='Confirm'
          style='primary'
          disabled={isLoading || (!version.name || !version.file)}
          loading={isLoading}
          onClick={handleOnConfirm} />
      </div>
    </BaseModal>
  )
}