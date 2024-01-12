import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import { useGetProjectQuery } from 'store/api';

import ContextButton from 'components/ContextButton';
import { useTranslation } from 'react-i18next';

export default function TrackListOptions({ track, isOpenned, toggleOptions, closeOptions }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      project: project,
      versions: project.versions,
      lastVersion: track.last_version_id
    }

    openDownloadModal(meta);
  }

  const handleDetail = () => {
    navigate(`treasure/${track.id}`)
  }

  const options = [
    { type: 'detail', description: t('global.view_details'), action: handleDetail },
    { type: 'download', description: t('global.download'), action: handleDownloadVersion },
    { type: 'add', description: t('global.add'), action: handleCreateVersion },
    { type: 'edit', description: t('global.edit'), action: handleEditTrack },
    { type: 'delete', description: t('global.delete'), action: handleDeleteTrack },
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
    <ContextButton options={options} action={handleAction} isOpenned={isOpenned} toggleOptions={toggleOptions} closeOptions={closeOptions}/>
  )
}