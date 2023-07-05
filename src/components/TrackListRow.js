import { useState } from 'react';
import { formatDate } from 'utils/helpers';
import TrackListOptions from 'components/TrackListOptions';
import upload from 'assets/images/icon-upload.svg';
import { formatTime } from 'utils/helpers';

export default function TrackListRow({ track, onClick }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <tr
        onMouseEnter={() => { setShow(true) }}
        onMouseOut={() => { setShow(false) }}
        onClick={onClick}>
        <td>
          <div className='flex flex-row gap-4'>
            <div className='relative rounded flex items-center'>
              <img src={track.cover} alt='' width={44} height={44} className='' />
              {show &&
                <div className='play-hover'></div>
              }
            </div>
            <div>
              <div className='text-lg'>{track.name}</div>
              <div className='text-sm text-neutral-silver-200'>
                {track.author.join(', ')}
              </div>
            </div>
          </div>
        </td>
        <td>{track.album}</td>
        <td>{track.version}</td>
        <td>
          <span className='capitalize'>
            {formatDate(track.date)}
          </span>
        </td>
        <td>{formatTime(track.length)}</td>
        <td>{track.size} MB</td>
        <td>
          <div className='flex'>
            <button type='button' className='p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-600'>
              <img src={upload} alt='' width={24} height={24} />
            </button>
            <TrackListOptions />
          </div>
        </td>
      </tr>
    </>
  )
}