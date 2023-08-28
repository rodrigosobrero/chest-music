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
              <div className='xl:flex hidden'>
                  <span className='text-neutral-silver-200'>
                      {timeDifference(invite.data.date)}
                  </span>
              </div>
              <NotificationStatus status={invite.data.status} isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
        </div>
        <NotificationOption isOpen={isOpen} onDeny={() => setIsDenied(true)} onAccept={() => setIsAccepted(true)} 
                            isDenied={isDenied} isAccepted={isAccepted} blockUser={blockUser}/>
       </div>
    </>
  )
}

export default NotificationRow