import React, { useEffect, useState } from 'react'
import { NotificationList } from './NotificationList'
import GeneralList from '../GeneralList'
import Modal from '../Modal'
import Ubication from 'components/Ubication'
import { useLocation } from 'react-router-dom'
const Notification = ({notifications}) => {
  const [status, setStatus] = useState('invites')
  const [generalNotifications, setGeneralNotifications] = useState([])
  const [invites, setInvites] = useState([])
  const [toggle, setToggle] = useState(false)
  const location = useLocation()
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
          <Ubication path={location.pathname}/>
           <div>
              <button className={status === 'invites' && 'isActive'} onClick={() => setStatus('invites')}>
                  Invites <span>{invites.length}</span>
              </button>
              <div className={`w-[80%] mx-auto mt-1.5 border border-brand-gold ${status !== 'invites' && 'hidden'}`}></div>
           </div>
           <div>
              <button className={status === 'general' && 'isActive'} onClick={() => setStatus('general')}>
                  General <span>{invites.length}</span>
              </button>
              <div className={`w-[80%] mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'general' && 'hidden'}`}></div>
           </div>
        </div>
        <div className='w-full xl:w-[42.5rem] bg-neutral-silver-700 flex h-[80%] overflow-y-auto flex-col xl:p-8 p-3 space-y-2 rounded-lg'>
            {status === 'general' ? <GeneralList data={generalNotifications} /> : <NotificationList invites={invites} />}
        </div>
      </div>
    </>
  )
}

export default Notification