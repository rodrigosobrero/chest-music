import React, { useEffect, useState } from 'react'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import GeneralList from './GeneralList'
import axios from 'axios'
import { apiUrl } from 'utils/api'
import Loading from 'components/Loading'
const Notification = () => {
  const { t } = useTranslation() 
  const { token } = useSelector((state) => state.auth.user)
  const [status, setStatus] = useState('invites')
  const [generalNotifications, setGeneralNotifications] = useState(false)
  const [invites, setInvites] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  console.log(invites)

  useEffect(() => {
    if(!invites){
      setIsLoading(true)
      axios.get(apiUrl + 'notification/?type=invites' , { 
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => setInvites(response.data.invites.notifications))
      .finally(() => setIsLoading(false))
    }
  }, [invites, token])

  useEffect(() => {
    if(status === 'general'){
      if(!generalNotifications){
        setIsLoading(true)
        axios.get(apiUrl + 'notification/?type=general' , { 
          headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
          console.log('volvi a entrar')
          setGeneralNotifications(response.data.general.notifications)
        } )
        .finally(() => setIsLoading(false))
      } else {
        console.log('volvi a salir')
      }
    }
  }, [generalNotifications, status, token])

  useEffect(() => {
    if(status === 'general' && isChanged === true){
      axios.get(apiUrl + 'notification/?type=invites' , { 
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => setInvites(response.data.invites.notifications))
      .finally(() => setIsChanged(false))
    }
  }, [status, isChanged])

  const blockUser = (id, callback) => {
    axios.post(apiUrl + 'notification/permission', 
       {  "user": id,
          "permission": "blocked"}, 
       { headers: {  Authorization: `Bearer ${token}`}, })
       .then((response) => {
          console.log(response)
       })
       .finally(() => callback())
  }
  const replyNotification = (invite_id, type) => {
    console.log('entre antes', type)
    if(type !== 'denied' && type !== 'accepted') return;
    console.log('entre')
    axios.patch(apiUrl + `notification/invite/${invite_id}/reply/`, 
                { response: type},
                { headers: { Authorization: `Bearer ${token}`}})
                .then((response) => { setIsChanged(true); return true})
                .catch(() => { return false })
                
    
  }

  return (
    <>
      <div >
        <div className='options'>
           <div>
              <button className={status === 'invites' && 'isActive'} onClick={() => setStatus('invites')}>
                  {t('notification.invites')} <span>{invites.length}</span>
              </button>
              <div className={`w-[80px] mx-auto mt-1.5 border border-brand-gold ${status !== 'invites' && 'hidden'}`}></div>
           </div>
           <div className='text-lg'>
              <button className={status === 'general' && 'isActive'} onClick={() => setStatus('general')}>
              {t('notification.general')} <span>{invites.length}</span>
              </button>
              <div className={`w-[80px] mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'general' && 'hidden'}`}></div>
           </div>
        </div>
        <div className={`w-full md:w-[720px] bg-neutral-silver-700  flex 
                        overflow-y-auto flex-col md:px-8 md:py-10 px-3 py-4 rounded-2xl ${isLoading && 'items-center'}`}>
            {isLoading ? <Loading /> : status === 'general' 
                       ?  <GeneralList data={generalNotifications} /> : 
                          <NotificationList invites={invites} blockUser={blockUser} replyNotification={replyNotification}/>}
        </div>
      </div>
    </>
  )
}

export default Notification