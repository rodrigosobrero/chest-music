import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import { useGetProjectQuery } from 'store/api';

import ContextButton from 'components/ContextButton';

export default function TrackListOptions({ track }) {
  const navigate = useNavigate();

  const { onOpen: openEditModal } = useModal('EditTrackModal');
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteTrackModal');
  const { onOpen: openDownloadModal } = useModal('DownloadVersionModal');

  const {
    data: project = {}
  } = useGetProjectQuery(track.id);

  const handleEditTrack = () => {
    const meta = {
      id: track.id,
      album: track.album,
      name: track.name
    }

    openEditModal(meta)
  }

  const handleCreateVersion = () => {
    const meta = {
      name: track.name,
      participants: track.authors,
      project: track.id
    }

    openUploadModal(meta);
  }

  const handleDeleteTrack = () => {
    const meta = { 
      id: track.id,
      name: track.name
    }

    openDeleteModal(meta);
  }

  const handleDownloadVersion = () => {
    const meta = {
      versions: project.versions,
      lastVersion: track.last_version_id
    }

    openDownloadModal(meta);
  }

  const handleDetail = () => {
    navigate(`treasure/${track.id}`)
  }

  const options = [
    { type: 'detail', description: 'View details', action: handleDetail },
    { type: 'download', description: 'Download', action: handleDownloadVersion },
    { type: 'add', description: 'Add', action: handleCreateVersion },
    { type: 'edit', description: 'Edit', action: handleEditTrack },
    { type: 'delete', description: 'Delete', action: handleDeleteTrack },
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