import React, { useState } from 'react'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import {  useGetNotificationsQuery, useUpdateNotificationsMutation } from 'store/api';
import { useSelector } from 'react-redux'
import GeneralList from './GeneralList'
import axios from 'axios'
import { apiUrl } from 'utils/api'
import Loading from 'components/Loading'
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
    axios.post(apiUrl + 'notification/permission/block/', 
       {  "user": id }, 
       { headers: {  Authorization: `Bearer ${user?.token}`}, })
       .then((response) => {
          toggleBlocked();
       })
       .finally(() => callback())
  }

  const unblockUser = (id, toggleBlocked) => {

    axios.post(apiUrl + 'notification/permission/allow/', 
       {  "user": id }, 
       { headers: {  Authorization: `Bearer ${user?.token}`}, })
       .then((response) => {
         toggleBlocked();
       })
       .catch((error) => console.log('error'))
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
              <button className={status === 'invites' && 'isActive'} onClick={() => { setStatus('invites'); setIsChanged(true) }}>
                  {t('notification.invites')} <span>{notifications?.invites?.new}</span>
              </button>
              <div className={`w-[80px] mx-auto mt-1.5 border border-brand-gold ${status !== 'invites' && 'hidden'}`}></div>
           </div>
           <div className='text-lg'>
              <button className={status === 'general' && 'isActive'} onClick={() => {setStatus('general');}}>
              {t('notification.general')} <span>{notifications?.general?.new}</span>
              </button>
              <div className={`w-[80px] mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'general' && 'hidden'}`}></div>
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