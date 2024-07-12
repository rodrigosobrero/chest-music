import React from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";
import { motion } from 'framer-motion';
import { NoSymbolIcon } from "@heroicons/react/24/solid";
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';


const NotificationOption = ({ isOpen, onAccept, onDeny, isAccepted, isDenied, blockUser, isBlocked, unblockUser }) => {
   const { t } = useTranslation();
    return (
        <>
         <motion.div
          className={`notification-option ${isOpen ? 'open' : ''}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}>
          {isOpen && !isAccepted && !isDenied &&
             <div className='flex justify-between md:gap-x-4 gap-x-3 font-archivo font-semibold'>
                <button className='w-full bg-black text-white rounded-xl font-bold px-6 py-3' onClick={onDeny}>{t('global.deny')}</button>
                <Button style='primary' onClick={onAccept} text={t('global.accept')}/>
             </div>
          }
          {isOpen && (isAccepted || isDenied) &&
             <div className='flex px-5 bg-neutral-silver-700 gap-x-4 justify-center md:h-[46px] rounded-xl'>
                <span className='flex items-center text-neutral-silver-100 text-base'> 
                    {isAccepted && <> <CheckIcon className="h-5 w-5 text-[#14BD44]"/> Invite accepted </> }
                    {isDenied &&   <> <NoSymbolIcon className="h-5 w-5 text-error-red"/> Invite denied </> }
                </span>
                {isDenied && <button onClick={isBlocked ? unblockUser : blockUser} className='text-brand-gold py-1.5'> {isBlocked ? 'Unblock' : 'Block'}</button> }     
                </div>
            }
         </motion.div>
      </>
    )
}

export default NotificationOption