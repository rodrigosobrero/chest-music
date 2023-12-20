import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateParticipantMutation } from 'store/api';
import config from 'data/config.json';
import { BaseModal } from 'components/BaseModal';
import UserSelector from 'components/treasure/UserSelector';
import Button from 'components/Button';

export default function AddParticipantModal(props) {
  const { t } = useTranslation();
  const [participant, setParticipant] = useState('');
  const [createParticipant, { isLoading }] = useCreateParticipantMutation();

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleCancel = () => {
    handleClose();
    setParticipant('');
  }

  const handleSave = async () => {
    const result = await createParticipant({
      'project': props.meta.project.id,
      'user': participant.id,
      'role': participant.role
    });

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
        roles={config.roles}
        users={props.meta.project.participants}
        selected={setParticipant} />
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='third'
          onClick={handleCancel} />
        <Button
          text={t('global.save')}
          style='primary'
          disabled={isLoading || !participant}
          loading={isLoading}
          onClick={handleSave} />
      </div>
    </BaseModal>
  )
}