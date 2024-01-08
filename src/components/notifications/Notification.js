import React, { useState } from 'react'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import {  useGetNotificationsQuery, useUpdateNotificationsMutation } from 'store/api';
import { useSelector } from 'react-redux'
import GeneralList from './GeneralList'
import axios from 'axios'
import { process.env.REACT_APP_API } from 'utils/api'
import Loading from 'components/Loading'
import TabButton from 'components/TabButton';
const Notification = () => {
  const { t } = useTranslation() 
  const user = useSelector((state) => state.auth.user)
  const [status, setStatus] = useState('invites')
  const [isChanged, setIsChanged] = useState(false)
  const [updateNotifications] = useUpdateNotificationsMutation();
  const { data: notifications = {}, 
          isLoading, 
          isFetching } = useGetNotificationsQuery(status, { refetchOnMountOrArgChange: !isChanged })

  const blockUser = (id, callback, toggleBlocked) => {
    axios.post(process.env.REACT_APP_API + 'notification/permission/block/', 
       {  "user": id }, 
       { headers: {  Authorization: `Bearer ${user?.token}`}, })
       .then((response) => {
          toggleBlocked();
       })
       .finally(() => callback())
  }

  const unblockUser = (id, closeModal, toggleBlocked) => {

    axios.post(process.env.REACT_APP_API + 'notification/permission/allow/', 
       {  "user": id }, 
       { headers: {  Authorization: `Bearer ${user?.token}`}, })
       .then((response) => {
         toggleBlocked();
         closeModal()
       })
       .catch((error) => closeModal())
  }

  const replyNotification = async (invite_id, type) => {
    if(type !== 'denied' && type !== 'accepted') return;
    await updateNotifications({ id: invite_id, response: type })
  }

  return (
    <>
      <div >
        <div className='options'>
           <div>
              <TabButton 
                  text={t('notification.invites')}  
                  onClick={() => { setStatus('invites'); setIsChanged(true) }} 
                  isActive={status === 'invites'} 
                  counter={notifications?.invites?.new} />
              {/* <div className={`w-[80px] mx-auto mt-1.5 border border-brand-gold ${status !== 'invites' && 'hidden'}`}></div> */}
           </div>
           <div className='text-lg'>
              <TabButton 
                  text={t('notification.general')} 
                  onClick={() => setStatus('general')} 
                  isActive={status === 'general'} 
                  counter={notifications?.general?.new}/>
              {/* <button className={status === 'general' && 'isActive'} onClick={() => {setStatus('general');}}>
              {t('notification.general')} <span>{notifications?.general?.new}</span>
              </button> */}
              {/* <div className={`w-[80px] mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'general' && 'hidden'}`}></div> */}
           </div>
        </div>
        <div className={`w-full md:w-[720px] bg-neutral-silver-700  flex 
                        overflow-y-auto flex-col md:px-8 md:py-10 px-3 py-4 rounded-2xl ${(isLoading || isFetching) && 'items-center'}`}>
            {(isLoading || isFetching) ? <Loading /> : status === 'general' 
                       ?  <GeneralList data={notifications?.general?.notifications} /> : 
                          <NotificationList invites={notifications?.invites?.notifications} 
                                            blockUser={blockUser} 
                                            replyNotification={replyNotification}
                                            unblockUser={unblockUser}/>
            }
        </div>
      </div>
    </>
  )
}

export default Notification