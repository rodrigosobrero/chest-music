import React, { useEffect, useState } from 'react'
import { formatDate , timeDifference} from 'utils/helpers'
import NotificationOption from './NotificationOption';
import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import NotificationStatus from './NotificationStatus';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';

const NotificationRow = ({ invite , blockUser, replyNotification, unblockUser }) => {
  const { t, i18n } = useTranslation()
  const [ isOpen, setIsOpen ] = React.useState(false)
  const [ isAccepted, setIsAccepted ] = React.useState(false)
  const [ show, setShow ] = React.useState()
  const [ isDenied, setIsDenied ] = React.useState(false)
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [selected, setSelected] = React.useState({})

  const handleSelect = (data) => {
    setSelected(data);
    setShow(true)
  }

  const toggleBlocked = () => setIsBlocked(!isBlocked)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
     <Modal show={show} setShow={setShow}>
        <div>
            <div className='px-10 text-center gap-y-3'>
              <h3>{isBlocked ? t('global.allow') : t('global.block')} user</h3>
              <span className='text-base text-neutral-silver-200'>
                Are you sure you want to {isBlocked ? t('global.allow') : t('global.block')} this user?
              </span>
              <div className='text-neutral-silver-200'>
                <span className='text-white'>{selected.full_name}</span> @{selected.username}
              </div>
            </div>
            <div className='font-archivo font-semibold flex mt-8 lg:gap-4 gap-3'>
              <Button text={'Cancel'} onClick={() => setShow(!isOpen)} style={'tertiary'}/>
              <Button text={isBlocked ? t('global.allow') : t('global.block')} 
                      onClick={() => {isBlocked ? unblockUser(selected.user_id, () => setShow(!isOpen),  toggleBlocked) : blockUser(selected.user_id, () => setShow(!isOpen), toggleBlocked)}} 
                      style={'primary'}/>
            </div>
        </div>
     </Modal>
     <div className='row'>
        <div className='flex items-center justify-between '>
          <div className='flex gap-x-4 items-center'>
            <div className='bg-neutral-black rounded-lg flex justify-center items-center p-2.5 md:p-3'>
               <MusicalNoteIcon className="md:h-7 md:w-7 h-5 w-5 text-white" />
            </div>
            <div className='flex flex-col'>
            <div 
      className={`md:text-lg text-base max-w-[360px] ${isExpanded ? 'whitespace-normal' : 'overflow-hidden whitespace-nowrap overflow-ellipsis'}`}
      onClick={toggleExpand}
      style={{ cursor: 'pointer' }}
    >{invite.content[i18n.language === 'en' ? 'en' : 'es'].title}</div>
              <div className='md:text-base text-sm text-neutral-silver-200'>
                  {invite.content[i18n.language === 'en' ? 'en' : 'es'].body}
              </div>
            </div>
          </div>
          <div className='flex gap-x-3 items-center'>
              <div className='md:flex hidden'>
                  <span className='text-neutral-silver-200 text-sm'>
                      {timeDifference(invite.date)}
                  </span>
              </div>
              <NotificationStatus status={invite.status} isOpen={isOpen} setIsOpen={setIsOpen} expired={invite.expired}/>
          </div>
        </div>
       {isOpen && <NotificationOption 
                    isOpen={isOpen} 
                    onDeny={() => { replyNotification(invite.id, 'denied'); setIsDenied(true)}}
                    onAccept={() => { replyNotification(invite.id, 'accepted'); setIsAccepted(true)}} 
                    isDenied={isDenied} 
                    isAccepted={isAccepted} 
                    blockUser={() => handleSelect(invite)} 
                    unblockUser={() => handleSelect(invite) }   
                    isBlocked={isBlocked}/>}
       </div>
    </>
  )
}

export default NotificationRow