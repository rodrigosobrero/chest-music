import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import api from 'utils/api';

import ContextButton from 'components/ContextButton';

export default function VersionsActionsButton({ version }) {
  const { user } = useSelector((state) => state.auth);

  const { onOpen: openEditModal } = useModal('EditVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteVersionModal');

  const handleEdit = () => {
    const meta = {
      id: version.id,
      name: version.name
    }

    openEditModal(meta)
  }

  const handleDownload = async () => {
    const link = document.createElement('a');

    try {
      const response = await api.get(`project/version/${version.id}/url/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      link.download = 'download';
      link.href = response.data.url;
      link.click();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {
    const meta = {
      id: version.id,
      name: version.name
    }

    openDeleteModal(meta);
  }

  const options = [
    { type: 'share', description: 'Share' },
    { type: 'download', description: 'Download', action: handleDownload },
    { type: 'edit', description: 'Edit', action: handleEdit },
    { type: 'delete', description: 'Move to trash can', action: handleDelete },
  ];

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