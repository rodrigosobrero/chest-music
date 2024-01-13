import { useState } from 'react';
import { useModal } from 'hooks/useModal';
import ContextButton from 'components/ContextButton';
import { useTranslation } from 'react-i18next';

export default function UsersActionsButton({ link }) {
  const { onOpen: openEditModal } = useModal('EditPermissionsUserModal');
  const { onOpen: openDeleteModal } = useModal('DeletePermissionsUserModal');
  const [isOpened, setIsOpenned] = useState(false)
  const { t } = useTranslation();

  const toggleOptions = () => setIsOpenned(!isOpened);

  const closeOptions=() => setIsOpenned(false);
  
  const handleEdit = () => {
    openEditModal(link)
  }

  const handleDelete = () => {
    openDeleteModal(link);
  }

  const options = [
    { type: 'edit', description: t('global.edit'), action: handleEdit },
    { type: 'delete', description: t('global.delete'), action: handleDelete },
  ]

  const handleAction = (action) => {
    const option = options.find((opt) => opt.type === action);

    if (option && option.action && typeof option.action === 'function') {
      option.action();
    } else {
      console.error(`No valid action found for type: ${action}`);
    }
  }

  return (
    <ContextButton options={options} action={handleAction} isOpened={isOpened} toggleOptions={toggleOptions} closeOptions={closeOptions} />
  )
}