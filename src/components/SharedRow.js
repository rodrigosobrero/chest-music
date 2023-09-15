import React from 'react'
import { useState } from 'react';
import { formatDate, formatTime, timeDifference } from 'utils/helpers';
import SharedToast from './SharedToast';
import webdisabled from 'assets/images/icon-webdisabled.svg'
const SharedRow = ({ track, isMobile }) => {
  var timestamp = 1672531200000; // Timestamp para el 01 de enero de 2023
console.log(timeDifference(timestamp)); 
  const [show, setShow] = useState(false);
  return (
    <>
    <tr
      className='text-left'
      onMouseEnter={() => { setShow(true) }}
      onMouseLeave={() => { setShow(false) }}
     >
      <td>
        <div className='flex flex-row gap-4'>
          <div className='relative rounded flex items-center'>
            {track.cover && 
              <img src={track.cover} alt='' width={44} height={44} className='' /> 
            }
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
      {!isMobile &&
          <>
            <td>{track.album}</td>
            <td>{track.version}</td>
            <td>
              <span className='capitalize'>
                {timeDifference(track.date)}
              </span>
            </td>
            <td>{formatTime(track.length)}</td>
            <td>{track.size}</td>
          </>}
      <td>
        <SharedToast />
      </td>
    </tr>
  </>
  )
}

export default SharedRow