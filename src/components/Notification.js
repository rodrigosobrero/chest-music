import React, { useState } from 'react'
import { NotificationList } from './NotificationList'
const Notification = ({invites}) => {
  const [status, setStatus] = useState('invites')
  return (
    <>
      <div>
        <div className='options'>
            <button className={status === 'invites' && 'isActive'} onClick={() => setStatus('invites')}>Invites{`(${invites.length})`}</button>
            <button className={status === 'general' && 'isActive'} onClick={() => setStatus('general')}>General</button>
        </div>
        <NotificationList invites={invites} />
      </div>
    </>
  )
}

export default Notification