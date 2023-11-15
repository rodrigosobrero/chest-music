import React from 'react'
import notifications from 'data/notifications.json'
import Notification from 'components/notifications/Notification'
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';

export default function Notifications() {

  return (
    <>
      <div className='notification'>
        <div className='space-y-6 w-full md:w-auto'>
          <h3>
            notifications
          </h3>
          <NavLink to={'manage'}>
            <p className='text-brand-gold flex gap-x-1.5 items-center justify-center text-xl py-1.5  '>
              <Cog8ToothIcon className='h-5 w-5' />
              Manage
            </p>
          </NavLink>
          <Notification notifications={notifications} />
        </div>
      </div>
    </>
  )
}

