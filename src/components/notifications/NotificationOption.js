import React from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";
import { motion } from 'framer-motion';
import { NoSymbolIcon } from "@heroicons/react/24/solid";


const NotificationOption = ({ isOpen, onAccept, onDeny, isAccepted, isDenied, blockUser }) => {

    return <>
            <motion.div
            className={`notification-option ${isOpen ? 'open' : ''}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}>
            {isOpen && !isAccepted && !isDenied &&
                <div className='flex justify-between space-x-2 font-archivo font-semibold'>
                    <button className='w-2/4 bg-black text-white rounded-lg font-bold px-6 py-3' onClick={onDeny}>Deny</button>
                    <button className='w-2/4 bg-brand-gold text-black  rounded-lg font-bold px-6 py-3' onClick={onAccept}>Accept</button>
                </div>
            }
            {isOpen && (isAccepted || isDenied) &&
                <div className='flex items-center justify-center space-x-4 font-archivo h-10 bg-neutral-silver-700'>
                    <span className='flex items-center text-neutral-silver-100 text-base'> 
                       {isAccepted ? <> <CheckIcon className="h-5 w-5 text-[#14BD44] mr-1"/> Invite accepted </> : 
                                     <> <NoSymbolIcon className="h-5 w-5 text-error-red mr-1"/> Invite denied </> }
                    </span>
                    <button className='text-brand-gold py-1.5'>Undo</button> 
                    {isDenied && <button onClick={blockUser} className='text-brand-gold py-1.5'> Block</button> }     
                </div>
            }
  </motion.div>
        </>
}

export default NotificationOption