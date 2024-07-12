import React from 'react'
import NotificationReplyButton from './NotificationReplyButton'
import { CheckIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';


const NotificationStatus = ({status , isOpen, setIsOpen, expired}) => {
  const { t, i18n } = useTranslation()
  return (
    <>    
      {status === 'pending' ? <NotificationReplyButton isOpen={isOpen} expired={expired} onClick={() => !expired && setIsOpen(!isOpen)}/> : 
        status === 'accepted' ? 
          <p className='capitalize flex items-center text-brand-gold'>
                <CheckIcon className="h-5 w-5 " />
                <span className='hidden md:flex '>{t('notification.accepted')}</span>
          </p> : 
          <>
            <NoSymbolIcon className="h-5 w-5 text-neutral-silver-400 md:hidden"/> <span className='text-neutral-silver-200 capitalize hidden md:flex'>{t('notification.denied')}</span> 
          </> 
       }
    </>
  )
}

export default NotificationStatus