import React from 'react'
import { NotificationList } from 'components/NotificationList'
import invites from 'data/invites.json'
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
          <NotificationList invites={invites}/>
        </div>
      </div>
    </>
  )
}

