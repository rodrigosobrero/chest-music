import React from 'react'
import NotificationRow from './NotificationRow'

export const NotificationList = ({ invites }) => {
  return (
    <>
          {invites?.map((el) => (
              <NotificationRow invite={el}/> 
          ))}
    </>
  )
}
