import { format } from 'utils/helpers';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';
import { useDoubleClick } from 'hooks/useDoubleClick';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import TrackListOptions from 'components/TrackListOptions';

import { PlayIcon } from '@heroicons/react/24/solid';
import { PauseIcon } from '@heroicons/react/24/solid';
import upload from 'assets/images/icon-upload.svg';

export default function TrackListRow({ track }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlist } = useSelector(state => state);
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);

  const playTrack = () => {
    dispatch(playing({
      id: track.last_version_id,
      album: track.album,
      cover: track.cover_url,
      name: track.name,
      authors: track.authors,
      type: 'project'
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
    e.stopPropagation();
    playTrack();
  }

  useEffect(() => {
    setPlay(playlist[0].id === track.last_version_id && playlist[0].type === 'project')
  }, [playlist]);

  return (
    <>
      <tr onClick={handleOnClick}>
        <td>
          <div className='flex flex-row items-center gap-3 md:gap-4'>
            <div
              className='w-11 h-11 bg-cover rounded'
              style={{ backgroundImage: `url(${track.cover_url})` }}
              onClick={handleOnCoverClick}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}>
              <AnimatePresence>
                {hover && !play &&
                  <motion.div
                    className='cover-hover'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}>
                      <PlayIcon className='h-6 w-6 text-white' />
                    </motion.div>
                  </motion.div>
                }
                {play &&
                  <motion.div
                    className='cover-hover'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <PauseIcon className='h-6 w-6 text-white' />
                  </motion.div>
                }
              </AnimatePresence>
            </div>
            <div>
              <span className='text-lg line-clamp-1'>{track.name}</span>
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
            <td>{format.bytes(track.size)}</td>
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
            <TrackListOptions track={track} />
          </div>
        </td>
      </tr>
    </>
  )
}