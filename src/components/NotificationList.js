import React from 'react'
import NotificationRow from './NotificationRow'

export const NotificationList = ({invites}) => {
  return (
    <>
      <div className='w-[42.5rem] bg-neutral-silver-700 flex min-h-64 flex-col p-8 space-y-2 rounded-lg'>
          {invites?.map((el) => (
              <NotificationRow invite={el}/> 
          ))}
      </div>
    </>
  )
}
