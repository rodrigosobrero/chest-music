import React from 'react'
import { formatDate, formatTime } from 'utils/helpers'
import NotificationButton from './NotificationButton'
import { CheckIcon } from "@heroicons/react/24/solid";
import NotificationOption from './NotificationOption';

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
                  <span className='text-neutral-silver-200'>
                      {formatDate(invite.track.date)}
                  </span>
              </div>
              {invite.status === 'pending' ? <NotificationButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/> : 
               invite.status === 'accepted' ? 
               <span className='text-white capitalize flex items-center'>
                     <CheckIcon className="h-5 w-5 text-white" /> accepted
               </span> : <span className='text-neutral-silver-200 capitalize'>denied</span> }
          </div>
        </div>
        <NotificationOption isOpen={isOpen}/>
       </div>
    </>
  )
}

export default NotificationRow