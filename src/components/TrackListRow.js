import { format } from 'utils/helpers';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playing, play as togglePlay } from 'app/playlist';
import { useDoubleClick } from 'hooks/useDoubleClick';
import { useEffect, useState } from 'react';

import TrackListOptions from 'components/TrackListOptions';

import { PlayIcon } from '@heroicons/react/24/solid';
import { PauseIcon } from '@heroicons/react/24/solid';
import upload from 'assets/images/icon-upload.svg';

export default function TrackListRow({ track , isOpened, toggleOptions, closeOptions }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlist } = useSelector((state) => state.playlist);
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);

  const playTrack = () => {
    dispatch(playing({
      id: track.last_version_id,
      album: track.album,
      cover: track.cover_url,
      name: track.name,
      authors: track.authors,
      type: 'project',
      isPlaying: true
    }));
  };

  const handleOnClick = useDoubleClick(
    () => playTrack(),
    () => navigate(`treasure/${track.id}`)
  );

  const handleOnShareClick = () => {
    navigate(`/share/${track.id}`);
  }

  const toggleHover = () => {
    setHover(prev => !prev);
  }

  const handleOnCoverClick = (e) => {
    if(play){
      return dispatch(togglePlay())
    }
    e.stopPropagation();
    setHover(false);
    playTrack();
  }

  useEffect(() => {
    setPlay(playlist[0]?.id === track.last_version_id && playlist[0]?.type === 'project');
  }, [playlist]);
  
  return (
    <>
      <tr onClick={handleOnClick}>
        <td>
          <div className='flex flex-row items-center gap-3 md:gap-4'>
            <div
              className='w-[52px] h-[52px] min-w-[52px] bg- bg-cover rounded'
              style={{ backgroundImage: `url(${track.cover_url})` }}
              onClick={handleOnCoverClick}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}>
              {hover && !play && <div className='cover-hover'><PlayIcon className='h-6 w-6 text-white' /></div>}
              {play && playlist[0]?.isPlaying && <div className='cover-hover'><PauseIcon className='h-6 w-6 text-white' /></div>}
            </div>
            <div>
              <span className='lg:text-lg line-clamp-1'>{track.name}</span>
              <div className='text-sm text-neutral-silver-200'>
                {track?.authors.join(', ')}
              </div>
            </div>
          </div>
        </td>
        {isDesktop && (
          <>
            <td>{track.album}</td>
            <td>{track.last_version}</td>
            <td>
              {format.date(track.date_added)}
            </td>
            <td>{format.time(track.duration)}</td>
            {/*<td>{format.bytes(track.size)}</td>*/}
          </>
        )}
        <td onClick={(e) => { e.stopPropagation() }}>
          <div className='flex justify-end'>
            {isDesktop && (
              <button
                type='button'
                className='p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-600'
                onClick={handleOnShareClick}>
                <img src={upload} alt='' width={24} height={24} />
              </button>
            )}
            <TrackListOptions track={track} isOpened={isOpened} toggleOptions={() => toggleOptions(track.id)} closeOptions={closeOptions} />
          </div>
        </td>
      </tr>
    </>
  )
}