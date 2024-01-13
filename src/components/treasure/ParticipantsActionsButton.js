import { useEffect, useState } from 'react';
import { useModal } from 'hooks/useModal';
import ContextButton from 'components/ContextButton';
import { useTranslation } from 'react-i18next';

export default function ParticipantsActionsButtons({ participant }) {
  const { onOpen: openEditModal } = useModal('EditParticipantModal');
  const { onOpen: openDeleteModal } = useModal('DeleteParticipantModal');
  const [isOpened, setIsOpenned] = useState(false)
  const { t } = useTranslation();

  const toggleOptions = () => setIsOpenned(!isOpened);

  const closeOptions=() => setIsOpenned(false)

  const handleEditUser = () => {
    openEditModal(participant)
  }

  const handleDeleteUser = () => {
    openDeleteModal(participant);
  }

  const options = [
    { type: 'edit', description: t('global.edit'), action: handleEditUser }
  ]

  const handleAction = (action) => {
    const option = options.find((opt) => opt.type === action);

    if (option && option.action && typeof option.action === 'function') {
      option.action();
    } else {
      console.error(`No valid action found for type: ${action}`);
    }
  }

  useEffect(() => {
    if (participant.removable) {
      options.push({
        type: 'delete', description: 'Delete', action: handleDeleteUser
      })
    }
  }, [participant])

  return (
    <ContextButton options={options} action={handleAction} isOpened={isOpened} toggleOptions={toggleOptions} closeOptions={closeOptions} />
  )
}