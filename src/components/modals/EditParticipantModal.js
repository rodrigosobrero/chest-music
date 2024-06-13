import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateParticipantMutation } from 'store/api';

import { BaseModal } from 'components/BaseModal';
import Select from 'components/Select';
import Button from 'components/Button';
import { firstLetterUpperCase } from 'utils/helpers';

export default function EditParticipantModal(props) {
  const { roles } = require('data/config.json');
  const { t } = useTranslation();
  const [role, setRole] = useState(props.meta.role);
  const [updateParticipant, { isLoading }] = useUpdateParticipantMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnChange = (e) => {
    setRole(e.target.value);
  }

  const handleSave = async () => {
    const result = await updateParticipant({
      id: props.meta.relation_id,
      role: role
    });

    if ('error' in result) {
      console.log('Error')
    } else {
      handleClose();
    }
  }

  return (
    <BaseModal title={t('share.edit_participant_permissions')} show={props.isOpen} onClose={handleClose}>
      <p className='text-white text-lg'>
        {props.meta.full_name} <span className=' text-neutral-silver-300'>@{props.meta.username}</span>
      </p>
      <Select
        options={props.meta.user_type === 'fan' ? roles.filter((rol) => rol === 'listener') : roles.filter((rol) => rol !== 'listener')}
        name='role'
        label={firstLetterUpperCase(t('tables.role'))}
        value={role}
        onChange={handleOnChange} />
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.save')}
          style='primary'
          disabled={isLoading || role === props.meta.role}
          loading={isLoading}
          onClick={handleSave} />
      </div>
    </BaseModal>
  )
}
