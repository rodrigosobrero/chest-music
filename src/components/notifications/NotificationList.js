import React, { useState } from 'react'
import NotificationRow from './NotificationRow'
import Modal from '../Modal'
import { useTranslation } from 'react-i18next'
import empty from 'assets/images/empty-chest.svg';

export const NotificationList = ({ invites, blockUser, replyNotification}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(undefined)
  const [isOpen , setIsOpen] = useState(false)

  const ModalContent = () => {
    return (
      <div>
        <div className='px-10 text-center gap-y-3'>
          <h3>block user</h3>
          <span className='text-base text-neutral-silver-200'>Are you sure you want to block this user?</span>
          <div className='text-neutral-silver-200'>
            <span className='text-white'>{selected.full_name}</span> @{selected.username}
          </div>
        </div>
        <div className='font-archivo font-semibold flex mt-8 gap-4'>
           <button className='w-[48%] bg-neutral-silver-600 text-white h-10 rounded-lg' onClick={() => setIsOpen(!isOpen)}>Cancel</button>
           <button className='w-[48%] bg-brand-gold text-black h-10 rounded-lg' onClick={() => blockUser(selected.user_id, () => setIsOpen(!isOpen))}>Block</button>
        </div>
      </div>
    )
  }
 
  const handleSelect = (data) => {
    setSelected(data);
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Modal show={isOpen} setShow={setIsOpen}>
        <ModalContent />
      </Modal>
      <div className='flex flex-col md:gap-y-4 gap-y-3'>
          {invites?.length > 0 ? invites?.map((el) => (
            <>
              <NotificationRow invite={el} blockUser={handleSelect} replyNotification={replyNotification}/> 
            </>
          )) :          
          <div className='flex flex-col items-center gap-2'>
              <h4>{t('notification.nothing_here')}</h4>
              <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                {t('notification.not_general')}
              </p>
              <img src={empty} alt='' width={240} height={128} className='mb-5' />
          </div>
        }
      </div>
    </>
  )
}
