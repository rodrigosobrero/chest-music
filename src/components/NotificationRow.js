import React from 'react'
import { formatDate, formatTime } from 'utils/helpers'
import NotificationButton from './NotificationButton'
const NotificationRow = ({invite}) => {
  const [ isOpen, setIsOpen ] = React.useState(false)
    console.log(formatTime(invite.track.date))
  return (
    <>
     <div className='row'>
        <div className='flex items-center justify-between '>
          <div className='flex space-x-4 items-center'>
            <img src={invite.track.cover} alt='' width={44} height={44} className='' /> 
            <div>
              <div className='text-base'>{invite.host} added you in a track</div>
              <div className='text-xs text-neutral-silver-200'>
                  {invite.track.name}
              </div>
            </div>
          </div>
          <div className='flex space-x-4'>
              <div>
                  <span className=''>
                      {formatDate(invite.track.date)}
                  </span>
              </div>
              <NotificationButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
          </div>
        </div>
       { isOpen &&   
        <div className='flex justify-between px-4 space-x-2'>
          <button className='w-2/4 bg-black text-white h-10 rounded-lg'>Deny</button>
          <button className='w-2/4 bg-white text-black h-10 rounded-lg	'>Accept</button>
        </div>}
       </div>
    </>
  )
}

export default NotificationRow