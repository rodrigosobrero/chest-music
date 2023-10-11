import React, { useEffect, useState } from 'react'
import { NotificationList } from './NotificationList'
import { useTranslation } from 'react-i18next'
import GeneralList from '../GeneralList'
const Notification = ({notifications}) => {
  const { t } = useTranslation() 
  const [status, setStatus] = useState('invites')
  const [generalNotifications, setGeneralNotifications] = useState([])
  const [invites, setInvites] = useState([])
  useEffect(() => {
    const filterNotifications = () => {
      const invites = notifications.filter((el) => el.type === 'invite');
      const general = notifications.filter((el) => el.type === 'general');
      return { invites, general };
    };
    const { invites, general } = filterNotifications();
    setGeneralNotifications(general);
    setInvites(invites);
  }, [notifications])

  return (
    <>
      <div>
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
        <div className='w-full md:w-[680px] bg-neutral-silver-700   flex min-h-[80%] overflow-y-auto flex-col md:px-8 md:py-10 p-3 space-y-2 rounded-2xl'>
            {status === 'general' ? <GeneralList data={generalNotifications} /> : <NotificationList invites={invites} />}
        </div>
      </div>
    </>
  )
}

export default Notification