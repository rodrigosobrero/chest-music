import { useState } from 'react';
import { useCreateVersionMutation } from 'store/api';
import { useTranslation } from 'react-i18next';

import { BaseModal } from 'components/BaseModal';
import Input from 'components/Input';
import Button from 'components/Button';
import UploaderSelf from 'components/UploaderSelf';

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
      file: e.id
    });
  }

  const handleOnConfirm = async () => {
    const data = {
      project: props.meta.project,
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
    <BaseModal title={t('global.add_version')} show={props.isOpen} onClose={handleClose}>
      <div className='flex flex-col items-center text-center mb-8'>
        <p className='text-white'>
          {props.meta.name}
        </p>
        <p className='!text-sm text-neutral-silver-200'>
          {props.meta.participants?.map((participant, index) => {
            const isObjectWithFullName = typeof participant === 'object' && participant.full_name;
            const displayName = isObjectWithFullName ? participant.full_name : participant;
            return (index ? ', ' : '') + displayName;
          })}
        </p>
      </div>
      <div className='flex flex-col gap-8'>
        <UploaderSelf id={handleOnFileChange} />
        <Input
          type='text'
          label={t('upload.version_name')}
          value={version.name}
          onChange={handleOnNameChange}
          helper={t('upload.version_helper')} />
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.confirm')}
          style='primary'
          disabled={isLoading || (!version.name || !version.file)}
          loading={isLoading}
          onClick={handleOnConfirm} />
      </div>
    </BaseModal>
  )
}