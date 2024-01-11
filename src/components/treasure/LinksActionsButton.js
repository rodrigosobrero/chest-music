import { useState } from 'react';
import { useModal } from 'hooks/useModal';
import ContextButton from 'components/ContextButton';

export default function LinksActionsButton({ link }) {
  const { onOpen: openEditModal } = useModal('EditPermissionsLinkModal');
  const { onOpen: openDeleteModal } = useModal('DeletePermissionsLinkModal');
  const [isOpenned, setIsOpenned] = useState(false)

  const toggleOptions = () => setIsOpenned(!isOpenned);

  const closeOptions=() => setIsOpenned(false);

  const handleDelete = async () => {
    openDeleteModal(link);
  }

  const handleEdit = () => {
    openEditModal(link);
  }

  const handleAction = (action) => {
    const option = options.find((opt) => opt.type === action);

    if (option && option.action && typeof option.action === 'function') {
      option.action();
    } else {
      console.error(`No valid action found for type: ${action}`);
    }
  }

  const options = [
    { type: 'edit', description: 'Edit', action: handleEdit },
    { type: 'delete', description: 'Delete', action: handleDelete }
  ]

  return (
    <ContextButton options={options} action={handleAction} isOpenned={isOpenned} toggleOptions={toggleOptions} closeOptions={closeOptions} />
  )
}