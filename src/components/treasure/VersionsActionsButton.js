import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { getUrlExtension } from 'utils/helpers';
import api from 'utils/api';

import ContextButton from 'components/ContextButton';

export default function VersionsActionsButton({ version, project }) {
  const { user } = useSelector((state) => state.auth);

  const { onOpen: openShareModal } =  useModal('ShareVersionModal');
  const { onOpen: openEditModal } = useModal('EditVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteVersionModal');

  const handleShare = () => {
    openShareModal(version);
  }

  const handleDownload = async () => {
    
    try {
      const response = await api.get(`project/version/${version.id}/url/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      const filename = {
        version: version.name,
        project: project.name,
        extension: getUrlExtension(response.data.url)
      }

      const link = document.createElement('a');

      link.href = response.data.url;
      link.download = `${filename.project}_${filename.version}.${filename.extension}`;
      link.click();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = () => {
    openEditModal(version);
  }

  const handleDelete = () => {
    openDeleteModal(version);
  }

  const options = [
    { type: 'share', description: 'Share', action: handleShare },
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