import React from 'react'
import notifications from 'data/notifications.json'
import Notification from 'components/Notification'
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';
export default function Notifications() {
  return (
    <>
      <div className='notification'>
        <div className='space-y-6'>
          <h3>
            notifications
          </h3>
          <NavLink to={'manage'}>
            <p className='text-brand-gold flex justify-center'>
              <Cog8ToothIcon className=' h-5 w-5' />
              Manage
            </p>
          </NavLink>
          <Notification notifications={notifications} />
        </div>
      </div>
    </>
  )
}

