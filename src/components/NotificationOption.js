import React from 'react'

const NotificationOption = ({ isOpen }) => {
    return <>
            {isOpen && 
                <div className='flex justify-between space-x-2 font-archivo font-semibold'>
               <button className='w-2/4 bg-black text-white h-10 rounded-lg'>Deny</button>
                <button className='w-2/4 bg-white text-black h-10 rounded-lg'>Accept</button>
                </div>
            }
        </>
}

export default NotificationOption