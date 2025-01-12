import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, timeDifference } from 'utils/helpers';
import { playing, play as togglePlay } from 'app/playlist';
import { format } from 'utils/helpers';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const SharedRow = ({ track, isMobile }) => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);

  const playTrack = () => {
    dispatch(playing({
      id: track.version_id,
      album: track.album,
      cover: track.cover_url,
      name: track.title,
      authors: track.authors,
      type: 'project',
      isPlaying: true
    }));
  };

  const toggleHover = () => {
    if(track.play_limit === track.plays) return;
    
    setHover(prev => !prev);
  }

  const handleOnCoverClick = (e) => {
    if(track.play_limit === track.plays) return;

    if (play) {
      return dispatch(togglePlay())
    }

    setHover(false);
    playTrack();
  }

  useEffect(() => {
    setPlay(playlist[0]?.id === track.version_id && playlist[0]?.type === 'project');
  }, [playlist]);

  return (
    <>
      <tr onClick={handleOnCoverClick} style={{height: '5rem'}} 
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)} 
          className={`hover:bg-neutral-silver-600 text-left ${track.plays === track.play_limit && '!opacity-50'}`}>
        <td className='md:!pl-5'>
          <div className='flex flex-row gap-3 md:gap-4'>
            <div
              className='w-[52px] h-[52px] min-w-[52px] bg- bg-cover rounded'
              style={{ backgroundImage: `url(${track.cover_url})` }}>
              {hover && !play && <div className='cover-hover'><PlayIcon className='h-6 w-6 text-white' /></div>}
              {play && playlist[0]?.isPlaying && <div className='cover-hover'><PauseIcon className='h-6 w-6 text-white' /></div>}
            </div>
            <div>
              <div className='text-base md:text-lg text-left line-clamp-1' >{track.title}</div>
              <div className='text-sm text-neutral-silver-200'>
                {isMobile ? `${track.version + ' - ' + track.plays}` : track.authors.join(', ')}
              </div>
            </div>
          </div>
        </td>
        {!isMobile &&
          <>
            <td className='hover:underline'>{track.album ? track.album : 'any'}</td>
            <td>{track.version}</td>
            <td>
              <span className='capitalize text-base'>
                {timeDifference(track.date_shared ? track.date_shared : track.date_played)}
              </span>
            </td>
            <td>{format.time(track.length)}</td>
            <td>{track.play_limit ? `${track.plays} / ${track.play_limit}` : track?.plays}</td>
          </>
        }
      </tr>
    </>
  )
}

export default SharedRow