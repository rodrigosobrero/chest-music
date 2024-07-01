import { format } from 'utils/helpers';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playing, play as togglePlay } from 'app/playlist';
import { useDoubleClick } from 'hooks/useDoubleClick';
import { useEffect, useState } from 'react';
import bar from 'assets/images/icon-barra.svg'

import TrackListOptions from 'components/TrackListOptions';
import TrackVersionsActionsButton from './TrackVersionOptions';

import { PlayIcon } from '@heroicons/react/24/solid';
import { PauseIcon } from '@heroicons/react/24/solid';
import upload from 'assets/images/icon-upload.svg';

import { useModal } from 'hooks/useModal';

export default function TrackListRow({ track, isOpened, version, toggleOptions, closeOptions, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlist } = useSelector((state) => state.playlist);
  const account = useSelector((state) => state.auth.user.data);
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);
  const [suspended, setSuspended] = useState(false);
  const { onOpen: openShareModal } = useModal('ShareVersionModal');
  const { onOpen: openOptionsModal, isOpen } = useModal('OptionsTrackModal');

  const playTrack = () => {
    dispatch(playing({
      id: version.id,
      album: track.album,
      cover: track.cover_url,
      name: track.name,
      authors: track.authors,
      type: 'project',
      isPlaying: true
    }));
  };

  const handleOnClick = useDoubleClick(
    () => handlePlay(),
    () => navigate(`treasure/${track.id}`)
  );

  const handleOnShareClick = () => {
    if (type === 'version') return openShareModal(version);

    else navigate(`/share/${track.id}`);
  }

  const handleOpenOptions = () => {
    if (isDesktop) {
      toggleOptions(version.id);
      setHover(false)
    } else {
      openOptionsModal({ version, track, navigate })
    }
  }

  const handlePlay = () => {
    if (play) {
      setHover(false);
      return dispatch(togglePlay())
    }

    setHover(false)
    playTrack();
  }

  const handleOnTitleClick = (e) => {
    e.stopPropagation();
    navigate(`treasure/${track.id}`)
  }

  const handleOnCoverClick = (e) => {
    e.stopPropagation();
    setHover(false);

    if (play) {
      return dispatch(togglePlay());
    }

    playTrack();
  }

  useEffect(() => {
    let isOnPlayer = playlist[0]?.id === version.id;

    setPlay(isOnPlayer);

  }, [playlist]);

  useEffect(() => {
    if (!account || !account.subscription) {
      setSuspended(true);
      return;
    }

    const { status } = account.subscription || {};

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    }
  }, [account]);

  return (
    <tr onClick={handleOnClick} style={{ height: '5rem' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='hover:bg-neutral-silver-600'>
      <td className='md:!pl-5'>
        <div className='flex flex-row items-center gap-3 md:gap-4'>
          {type !== 'version' ?
            <div
              className='w-[52px] h-[52px] min-w-[52px] bg- bg-cover rounded'
              style={{ backgroundImage: `url(${track.cover_url})` }}
              onClick={handleOnCoverClick}>
              {hover && !play && <div className='cover-hover'><PlayIcon className='h-6 w-6 text-white' /></div>}
              {play && playlist[0]?.isPlaying && <div className='cover-hover'><PauseIcon className='h-6 w-6 text-white' /></div>}
            </div>
            :
            <div className='w-[52px]'>
              {hover && !play ? <PlayIcon className='h-6 w-6 text-white mx-auto' /> :
                play && playlist[0]?.isPlaying ? <PauseIcon className='h-6 w-6 text-white mx-auto' /> :
                  <img src={bar} className='h-[80px] w-[30px] mx-auto' />
              }
            </div>
          }
          <div className='max-w-none lg:max-w-[230px] xl:max-w-none'>
            <span className='lg:text-lg line-clamp-1 z-50' onClick={handleOnTitleClick}>{track.name}</span>
            <div className='text-sm text-neutral-silver-200'>
              {track?.authors.join(', ')}
            </div>
          </div>
        </div>
      </td>
      {isDesktop && (
        <>
          <td>{track.album}</td>
          <td>{version.name}</td>
          <td>
            {format.date(version.date_added)}
          </td>
          <td>{format.time(version.duration)}</td>
        </>
      )}
      <td onClick={(e) => { e.stopPropagation() }} className='md:!pr-5'>
        <div className='flex justify-end'>
          {isDesktop && (
            <button
              disabled={suspended}
              type='button'
              className='p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-600 disabled:opacity-30'
              onClick={handleOnShareClick}>
              <img src={upload} alt='' width={24} height={24} />
            </button>
          )}
          {
            type === 'version' ?
              <TrackVersionsActionsButton
                version={version}
                project={track}
                isOpened={isOpened}
                toggleOptions={handleOpenOptions}
                closeOptions={() => { closeOptions(); setHover(false) }}
              /> :
              <TrackListOptions
                track={track}
                isOpened={isOpened}
                toggleOptions={handleOpenOptions}
                closeOptions={() => { closeOptions(); setHover(false) }}
              />
          }
        </div>
      </td>
    </tr>
  )
}