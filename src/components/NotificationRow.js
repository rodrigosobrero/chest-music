import React from 'react'
import { formatDate, formatTime } from 'utils/helpers'
import NotificationReplyButton from './NotificationReplyButton'
import { CheckIcon } from "@heroicons/react/24/solid";
import NotificationOption from './NotificationOption';
import { MusicalNoteIcon } from "@heroicons/react/24/solid";


const NotificationRow = ({invite}) => {
  const [ isOpen, setIsOpen ] = React.useState(false)
  const [ isAccepted, setIsAccepted ] = React.useState(false)
  const [ isDenied, setIsDenied ] = React.useState(false)

  return (
    <>
     <div className='row'>
        <div className='flex items-center justify-between '>
          <div className='flex space-x-4 items-center'>
            <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
               <MusicalNoteIcon className="h-5 w-5  text-white" />
            </div>
            <div>
              <div className='text-base'>{invite.data.title}</div>
              <div className='text-xs text-neutral-silver-200'>
                  {invite.data.body}
              </div>
            </div>
          </div>
          <div className='flex space-x-4'>
              <div>
                  <span className='text-neutral-silver-200'>
                      {formatDate(invite.data.date)}
                  </span>
              </div>
              {invite.data.status === 'pending' ? <NotificationReplyButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/> : 
               invite.data.status === 'accepted' ? 
               <span className='capitalize flex items-center text-brand-gold'>
                     <CheckIcon className="h-5 w-5" /> accepted
               </span> : <span className='text-neutral-silver-200 capitalize'>denied</span> }
          </div>
        </div>
        <NotificationOption isOpen={isOpen} onDeny={() => setIsDenied(true)} onAccept={() => setIsAccepted(true)} 
                            isDenied={isDenied} isAccepted={isAccepted}/>
       </div>
    </>
  )
}

export default NotificationRow