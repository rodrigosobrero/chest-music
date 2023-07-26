import React from 'react'
import invites from 'data/invites.json'
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
          <Notification invites={invites} />
        </div>
      </div>
    </>
  )
}

