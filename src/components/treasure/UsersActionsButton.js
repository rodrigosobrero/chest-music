import { useModal } from 'hooks/useModal';
import ContextButton from 'components/ContextButton';

export default function UsersActionsButton({ link }) {
  const { onOpen: openEditModal } = useModal('EditPermissionsUserModal');
  const { onOpen: openDeleteModal } = useModal('DeletePermissionsUserModal');

  const handleEdit = () => {
    openEditModal(link)
  }

  const handleDelete = () => {
    openDeleteModal(link);
  }

  const options = [
    { type: 'edit', description: 'Edit', action: handleEdit },
    { type: 'delete', description: 'Delete', action: handleDelete },
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
    <ContextButton options={options} action={handleAction} />
  )
}