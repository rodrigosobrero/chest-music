import React from 'react'
import notifications from 'data/notifications.json'
import Notification from 'components/Notification'
export default function Notifications() {
  return (
    <>
      <div className='notification'>
        <div>
          <h3>
            notifications
          </h3>
          <p>
            manage
          </p>
          <Notification notifications={notifications} />
        </div>
      </div>
    </>
  )
}

