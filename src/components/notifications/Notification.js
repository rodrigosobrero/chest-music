import React, { useEffect, useState } from 'react'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import { useGetChestQuery, useGetNotificationsQuery, useUpdateNotificationsMutation } from 'store/api';
import { useSelector } from 'react-redux'
import GeneralList from './GeneralList'
import axios from 'axios'
import { apiUrl } from 'utils/api'
import Loading from 'components/Loading'
const Notification = () => {
  const { t } = useTranslation() 
  const user = useSelector((state) => state.auth.user)
  const [status, setStatus] = useState('invites')
  // const [generalNotifications, setGeneralNotifications] = useState(false)
  // const [invites, setInvites] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [updateNotifications] = useUpdateNotificationsMutation();
  const { data: notifications = {}, 
          isLoading } = useGetNotificationsQuery(status, { refetchOnMountOrArgChange: !isChanged })
  const { refetch } = useGetChestQuery(); 

   // console.log(invites)
  //  useEffect(() => {
  //   return () => {
  //     if(isSuccess) {
  //       refetchNotifications();
  //     }
  //   };

  // }, [isSuccess, refetchNotifications]);
  // useEffect(() => {
  //   if(!user?.token) return
  //   if(!invites){
  //     setIsLoading(true)
  //     axios.get(apiUrl + 'notification/?type=invites' , { 
  //       headers: { Authorization: `Bearer ${user.token}` }
  //     }).then((response) => setInvites(response.data.invites.notifications))
  //     .finally(() => setIsLoading(false))
  //   }
  // }, [invites, user?.token])

  // useEffect(() => {
  //   if(!user?.token) return
  //   if(status === 'general'){
  //     if(!generalNotifications){
  //       setIsLoading(true)
  //       axios.get(apiUrl + 'notification/?type=general' , { 
  //         headers: { Authorization: `Bearer ${user?.token}` }
  //       }).then((response) => {
  //         setGeneralNotifications(response.data.general.notifications)
  //       } )
  //       .finally(() => setIsLoading(false))
  //     } else {
  //       console.log('volvi a salir')
  //     }
  //   }
  // }, [generalNotifications, status, user?.token])

  // useEffect(() => {
  //   if(!user?.token) return
  //   if(status === 'general' && isChanged === true){
  //     axios.get(apiUrl + 'notification/?type=invites' , { 
  //       headers: { Authorization: `Bearer ${user?.token}` }
  //     }).then((response) => setInvites(response.data.invites.notifications))
  //     .finally(() => setIsChanged(false))
  //   }
  // }, [status, isChanged])

  const blockUser = (id, callback) => {
    axios.post(apiUrl + 'notification/permission', 
       {  "user": id,
          "permission": "blocked"}, 
       { headers: {  Authorization: `Bearer ${user?.token}`}, })
       .then((response) => {
          console.log(response)
       })
       .finally(() => callback())
  }
  const replyNotification = (invite_id, type) => {
    if(type !== 'denied' && type !== 'accepted') return;
    axios.patch(apiUrl + `notification/invite/${invite_id}/reply/`, 
                { response: type},
                { headers: { Authorization: `Bearer ${user?.token}`}})
                .then(() =>  refetch())
                .catch(() => { return false })
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
                        overflow-y-auto flex-col md:px-8 md:py-10 px-3 py-4 rounded-2xl ${isLoading && 'items-center'}`}>
            {isLoading ? <Loading /> : status === 'general' 
                       ?  <GeneralList data={notifications?.general?.notifications} /> : 
                          <NotificationList invites={notifications?.invites?.notifications} blockUser={blockUser} replyNotification={replyNotification}/>}
        </div>
      </div>
    </>
  )
}

export default Notification