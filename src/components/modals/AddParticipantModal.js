import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateParticipantMutation, useCreateInviteMutation } from 'store/api';

import { BaseModal } from 'components/BaseModal';
import UserSelector from 'components/treasure/UserSelector';
import Button from 'components/Button';

export default function AddParticipantModal(props) {
  const { roles } = require('data/config.json');
  const { t } = useTranslation();
  const [participant, setParticipant] = useState('');
  const [createParticipant, { isLoading }] = useCreateParticipantMutation();
  const [createInvite, { isLoading: inviteIsLoading }] = useCreateInviteMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleCancel = () => {
    handleClose();
    setParticipant('');
  }

  const handleSave = async () => {
    let result;

    if (participant.isEmail) {
      result = await createInvite({
        'project': props.meta.project.id,
        'role': participant.role,
        'email': participant.full_name
      })
    } else {
      result = await createParticipant({
        'project': props.meta.project.id,
        'user': participant.id,
        'role': participant.role
      });
    }

    if ('error' in result) {
      console.log('Error');
    } else {
      setParticipant('');
      handleClose();
    }
  }

  return (
    <BaseModal title='add participant' show={props.isOpen} onClose={handleClose}>
      <UserSelector
        roles={roles}
        users={props.meta.project.participants}
        selected={setParticipant} />
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleCancel} />
        <Button
          text={t('global.save')}
          style='primary'
          disabled={isLoading || !participant || inviteIsLoading}
          loading={isLoading || inviteIsLoading}
          onClick={handleSave} />
      </div>
    </BaseModal>
  )
}