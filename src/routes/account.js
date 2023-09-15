import React from 'react'
import Ubication from 'components/Ubication'
import { useLocation } from 'react-router-dom'
import AccountData from 'components/profile/AccountData'
import AccountPlan from 'components/profile/AccountPlan'
const Account = () => {
  const location = useLocation()
  return (
    <>
        <div className='px-[60px]'>
            <Ubication path={location.pathname}/>
            <div className='flex mt-5 mb-8'>
                <div>
                    <h3 className='font-thunder-bold text-5xl font-bold'>Account</h3>
                    <h5 className='text-neutral-silver-200 text-lg'>Manage your personal information and current plan settings</h5>
                </div>
            </div>
            <div className='w-full bg-neutral-black p-8 flex gap-x-8 rounded-[32px]'>
                <AccountData />
                <AccountPlan />
            </div>
        </div>
    </>
  )
}

export default Account