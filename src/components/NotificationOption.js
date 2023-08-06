import React from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";



const NotificationOption = ({ isOpen, onAccept, onDeny, isAccepted, isDenied }) => {
    return <>
            {isOpen && !isAccepted && !isDenied &&
                <div className='flex justify-between space-x-2 font-archivo font-semibold'>
                    <button className='w-2/4 bg-black text-white h-10 rounded-lg' onClick={onDeny}>Deny</button>
                    <button className='w-2/4 bg-brand-gold text-black h-10 rounded-lg' onClick={onAccept}>Accept</button>
                </div>
            }
            {isOpen && (isAccepted || isDenied) &&
                <div className='flex items-center justify-center space-x-4 font-archivo h-10 bg-neutral-silver-700'>
                    <span className='flex items-center text-neutral-silver-100 text-base'> 
                       {isAccepted ? <> <CheckIcon className="h-5 w-5 text-[#14BD44]"/> Invite accepted </> : 
                                     <> Invite denied </> }
                    </span>
                    <button className='text-brand-gold'>Undo</button> 
                    {isDenied && <button>Block</button>}     
                </div>
            }
  
        </>
}

export default NotificationOption