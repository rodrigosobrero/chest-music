import React from 'react'
import { useState } from 'react';
import { formatTime, timeDifference } from 'utils/helpers';
import SharedToast from './SharedToast';
import webdisabled from 'assets/images/icon-webdisabled.svg'
import chestLogo from 'assets/images/chest-logo.svg'
const SharedRow = ({ track, isMobile }) => {
  console.log(track)
  const [show, setShow] = useState(false);
  return (
    <>
    <tr
      className='hover:rounded-xl hover:bg-neutral-silver-700 text-left'
      onMouseEnter={() => { setShow(true) }}
      onMouseLeave={() => { setShow(false) }}
     >
      <td>
        <div className='flex flex-row gap-4'>
             
          <div className='relative rounded flex items-center'>
            {track.cover ? 
              <img src={track.cover} alt='' width={44} height={44} className='' /> 
              : <div className=' w-11 rounded h-11 bg-neutral-silver-300 flex items-center justify-center'> 
                  <img src={chestLogo}/>
               </div>
            }
            {show &&
              <div className='play-hover'></div>
            }
          </div>
          
          <div>
            <div className='text-lg'>{track.title}</div>
            <div className='text-sm text-neutral-silver-200'>
              {track.authors.join(', ')}
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
                {track.date_played}
              </span>
            </td>
            <td>{formatTime(track.length)}</td>
            <td>{track.plays}</td>
          </>}
      <td>
        <SharedToast />
      </td>
    </tr>
  </>
  )
}

export default SharedRow