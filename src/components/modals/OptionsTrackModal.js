import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import { ClockIcon, PlayIcon } from "@heroicons/react/24/solid";
import { format } from 'utils/helpers';
import OptionsButton from 'components/OptionsButton';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function OptionsTrackModal(props) {
  const { t } = useTranslation();
  const account = useSelector((state) => state.auth.user.data);
  const { track, version, navigate } = props.meta;
  const [suspended, setSuspended] = useState(false);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }
  
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openEditModal } = useModal('EditVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteTrackModal');
  const { onOpen: openDownloadModal } = useModal('DownloadVersionModal');

  const handleEditTrack = () => {
    const meta = {
      id: track.id,
      album: track.album,
      name: track.name
    }

    openEditModal(meta)
  }

  const handleOnShareClick = () => {
    navigate(`/share/${track.id}`);
    handleClose();
  }

  const handleDetail = () => {
    navigate(`treasure/${track.id}`);
    handleClose();
  }

  const handleDownloadVersion = () => {
    const meta = {
      project: track,
      versions: track.versions,
      lastVersion: track.versions[0].id
    }

    openDownloadModal(meta);
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

  useEffect(() => {
    const { status } = account.subscription;

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  }, [account]);

  const options = [
    { type: 'detail', description: t('global.view_details'), onClick: handleDetail },
    { type: 'share', description: t('global.share'), onClick: handleOnShareClick, disabled: suspended},
    { type: 'add', description: t('global.add_version'), onClick: handleCreateVersion, disabled: suspended },
    { type: 'download', description: t('global.download'), onClick: handleDownloadVersion },
    { type: 'edit', description: t('global.edit'), onClick: handleEditTrack, disabled: suspended },
    { type: 'delete', description: t('global.delete'), onClick: handleDeleteTrack, disabled: suspended },
  ];

  useEffect(() => {
    const { status } = account.subscription;

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  });

  return (
    <BaseModal
      show={props.isOpen}
      cover={props.meta.track.cover_url}
      onClose={handleClose}>
      <div className='gap-4 flex flex-col'>
        <div className='gap-2 flex flex-col'>
          <h4 className='!text-left'>
              {track.name}
          </h4>
          <div className='text-md text-neutral-silver-100 capitalize'>
              {track?.authors.join(', ')}
          </div>
          <div className='text-neutral-silver-100 text-sm flex gap-4 font-archivo'>
            <div className='flex gap-2 items-center'>
              <ClockIcon className='h-5 w-5 text-brand-uva-light' />
              {format.time(track.versions[0].duration)}
            </div>
            <div className='flex gap-2 items-center'>
              <PlayIcon className="h-5 w-5 text-brand-uva-light" />
              {version[0]?.plays ? version[0].plays : 0}
            </div>  
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
              <span className='text-neutral-silver-300 text-base capitalize'>{t('tables.album')}</span>
              <span className='text-neutral-silver-100 text-base'>{track?.name}</span>
          </div>
          <div className='flex gap-4'>
              <div className='flex flex-col gap-1 w-full'>
                  <span className='text-neutral-silver-300 text-base'>{t('tables.version')}</span>
                  <span className='text-neutral-silver-100 text-base'>{track?.versions[0].name}</span>
              </div>          
              <div className='flex flex-col gap-1 w-full'>
                  <span className='text-neutral-silver-300 text-base'>{t('tables.date_added')}</span>
                  <span className='text-neutral-silver-100 text-base'>{format.date(track?.date_added)}</span>
              </div>
          </div>
        </div>
        <div className='mt-2 flex flex-col gap-2.5'>
          {
            options.slice(0, 4).map((option) => (
              <OptionsButton title={option.description} type={option.type} onClick={option.onClick} disabled={option.disabled} />
            ))
          }
          <div className='flex gap-3'>
            {
              options.slice(4).map((option) => (
                <OptionsButton title={option.description} type={option.type} onClick={option.onClick} disabled={option.disabled} />
              ))
            }
          </div> 
        </div>
      </div>
    </BaseModal>
  )
}