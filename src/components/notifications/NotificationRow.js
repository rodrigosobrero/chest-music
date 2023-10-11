import React from 'react'
import { formatDate , timeDifference} from 'utils/helpers'
import NotificationOption from './NotificationOption';
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import NotificationStatus from './NotificationStatus';


const NotificationRow = ({invite , blockUser}) => {
  const [ isOpen, setIsOpen ] = React.useState(false)
  const [ isAccepted, setIsAccepted ] = React.useState(false)
  const [ isDenied, setIsDenied ] = React.useState(false)

  return (
    <>
     <div className='row'>
        <div className='flex items-center justify-between '>
          <div className='flex space-x-4 items-center'>
            <div className='bg-neutral-black rounded-lg flex justify-center items-center p-2.5 md:p-3'>
               <MusicalNoteIcon className="md:h-7 md:w-7 h-5 w-5 text-white" />
            </div>
            <div className='flex flex-col'>
              <div className='md:text-xl text-base'>{invite.data.title}</div>
              <div className='md:text-base text-sm text-neutral-silver-200'>
                  {invite.data.body}
              </div>
            </div>
          </div>
          <div className='flex gap-x-3 items-center'>
              <div className='md:flex hidden'>
                  <span className='text-neutral-silver-200'>
                      {timeDifference(invite.data.date)}
                  </span>
              </div>
              <NotificationStatus status={invite.data.status} isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
        </div>
       {isOpen && <NotificationOption isOpen={isOpen} onDeny={() => setIsDenied(true)} onAccept={() => setIsAccepted(true)} 
                            isDenied={isDenied} isAccepted={isAccepted} blockUser={blockUser}/>}
       </div>
    </>
  )
}

export default NotificationRow