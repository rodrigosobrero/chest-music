import React, { useState } from 'react'
import NotificationIcon from './NotificationIcon'
import { timeDifference } from 'utils/helpers'
const GeneralRow = ({ notification }) => {
  const [toggle, setToggle] = useState(false)
  const handleChange = () => setToggle(!toggle)
  return (
        <>
           <div className={`row flex justify-between ${toggle && 'over'} `} onMouseEnter={handleChange} onMouseLeave={handleChange}>
                <div className='flex space-x-4 items-center'>
                <NotificationIcon  type={notification.data.status} iconStyle={`md:h-7 md:w-7 h-5 w-5 ${toggle ? 'text-brand-gold' : 'text-white'}`} 
                    containerStyle={'bg-neutral-black rounded-lg flex justify-center items-center p-2.5 md:p-3'}/>
                    <div>
                        <div className='md:text-xl text-base'>{notification.data.title}</div>
                        <div className='md:text-base text-sm text-neutral-silver-200'>
                            {notification.data.body}
                        </div>
                    </div>
                </div>
                <div className='justify-end md:flex  hidden pr-2'>
                      <span className='text-neutral-silver-200 text-sm'>
                          {timeDifference(notification.data.date)}
                      </span>
                </div>
            </div>
        </>
  )
}

export default GeneralRow