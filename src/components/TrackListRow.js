import { useState } from 'react';
import { format } from 'utils/helpers';
import TrackListOptions from 'components/TrackListOptions';
import upload from 'assets/images/icon-upload.svg';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';

export default function TrackListRow({ track, onClick }) {
  const dispatch = useDispatch();
  const playlist = useSelector(state => state.playlist);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      <tr
        onMouseEnter={() => { setShow(true) }}
        onMouseOut={() => { setShow(false) }}
        onClick={onClick}>
        <td>
          <div className='flex flex-row gap-3 md:gap-4'>
            <div className='relative rounded flex items-center' onClick={() => { dispatch(playing(track))}}>
              {track.cover_url &&
                <img src={track.cover_url} alt='' width={44} height={44} className='w-10 md:w-11 h-10 md:h-11' />
              }
              {show &&
                <div className='play-hover'></div>
              }
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
        <td>
          <div className='flex justify-end'>
            {isDesktop && (
              <button 
                type='button' 
                className='p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-600'
                onClick={() => { navigate(`/share/${track.id}`) }}>
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