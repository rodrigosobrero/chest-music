import React from 'react'
import NotificationIcon from './NotificationIcon'
import { formatDate } from 'utils/helpers'
const GeneralRow = ({ notification }) => {
  return (
        <>
            <div className='row flex justify-between'>
            <div className='flex space-x-4 items-center'>
               <NotificationIcon  type={notification.data.status} iconStyle='h-5 w-5 text-white' 
                containerStyle={'bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'}/>
                <div>
                    <div className='text-base'>{notification.data.title}</div>
                    <div className='text-xs text-neutral-silver-200'>
                        {notification.data.body}
                    </div>
                </div>
            </div>
                <div className='justify-end flex'>
                      <span className='text-neutral-silver-200'>
                          {formatDate(notification.data.date)}
                      </span>
                </div>
            </div>
        </>
  )
}

export default GeneralRow