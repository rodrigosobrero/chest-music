import React from 'react'
import NotificationReplyButton from './NotificationReplyButton'
import { CheckIcon } from "@heroicons/react/24/solid";


const NotificationStatus = ({status , isOpen, setIsOpen}) => {
  return (
    <>    
   {status === 'pending' ? <NotificationReplyButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/> : 
    status === 'accepted' ? 
    <p className='capitalize flex items-center text-brand-gold'>
          <CheckIcon className="h-5 w-5 " />
           <span className='hidden xl:flex'>accepted</span>
    </p> : <span className='text-neutral-silver-200 capitalize'>denied</span> }
    </>
  )
}

export default NotificationStatus