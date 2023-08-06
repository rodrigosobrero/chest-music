import React, { useEffect, useState } from 'react'
import { NotificationList } from './NotificationList'
import GeneralList from './GeneralList'
import Modal from './Modal'
const Notification = ({notifications}) => {
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
  const ModalContent = () => {
    return (
      <div>
        <h1>Hola</h1>
      </div>
      
    )
  }
  return (
    <>
      {/* <Modal show={true} children={ModalContent}/> */}
      <div>
        <div className='options'>
            <button className={status === 'invites' && 'isActive'} onClick={() => setStatus('invites')}>
                Invites <span>{invites.length}</span>
            </button>
            <button className={status === 'general' && 'isActive'} onClick={() => setStatus('general')}>
                General <span>{invites.length}</span>
            </button>
        </div>
        <div className='w-[42.5rem] bg-neutral-silver-700 flex h-[80%] overflow-y-auto flex-col p-8 space-y-2 rounded-lg'>
            {status === 'general' ? <GeneralList data={generalNotifications} /> : <NotificationList invites={invites} />}
        </div>
      </div>
    </>
  )
}

export default Notification