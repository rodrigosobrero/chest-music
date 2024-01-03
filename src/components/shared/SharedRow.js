import React from 'react'
import { useState } from 'react';
import { formatTime, timeDifference } from 'utils/helpers';
import chestLogo from 'assets/images/chest-logo.svg'

const SharedRow = ({ track, isMobile, onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <>
    <tr
      // onDoubleClick={() => alert('DOBLE CLICK')}
      className='hover:!rounded-xl hover:bg-neutral-silver-700 text-left '
      onMouseEnter={() => { setShow(true) }}
      onMouseLeave={() => { setShow(false) }}
     >
      <td className='md:w-[35%] mr-3'>
      <div className='flex flex-row gap-3 md:gap-4'>
          <div className='relative rounded flex items-center'>
            {track.cover_url ? 
              <img src={track.cover_url} width={44} height={44} className='' alt='cover' /> 
              : <div className=' w-11 rounded h-11 bg-neutral-silver-300 flex items-center justify-center'> 
                  <img src={chestLogo} alt='defaultCover'/>
               </div>
            }
            {show &&
              <div className='play-hover'></div>
            }
          </div>
          <div>
            <div className='text-base md:text-lg line-clamp-1 hover:underline'>{track.title}</div>
            <div className='text-sm text-neutral-silver-200'>
              {isMobile ?  `${track.version+' - '+track.plays}`: track.authors.join(', ')}
            </div>
          </div>
        </div>
      </td>
      {!isMobile &&
          <>
            <td className='md:w-[20%] md:mr-3 hover:underline'>{track.album ? track.album : 'any'}</td>
            <td className='md:w-[15%] md:mr-3'>{track.version}</td>
            <td className='md:w-[15%] md:mr-3'>
              <span className='capitalize text-base'>
                {timeDifference(track.date_shared ?  track.date_shared : track.date_played)}
              </span>
            </td>
            <td className='w-[10%] md:!mr-3'>{formatTime(track.length)}</td>
            <td className='w-[10%] md:!mr-3'>{track.plays}</td>
          </>}
      <td className='md:w-[10%]'>
        {/* <SharedToast /> */}
      </td>
    </tr>
  </>
  )
}

export default SharedRow