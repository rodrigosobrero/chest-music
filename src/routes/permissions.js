import Ubication from 'components/Ubication'
import React from 'react'
import { useLocation } from 'react-router-dom'
import permissions from 'data/permissions.json'
import PermissionsList from 'components/profile/PermissionsList'
const Permissions = () => {
  const location = useLocation()
  return (
    <>
      <div className='px-[60px]'>
        <Ubication path={location.pathname} />
        <div className='flex flex-col mt-5 mb-8'>
                <div>
                    <h3 className='font-thunder-bold text-5xl font-bold'>Global permissions</h3>
                    <h5 className='text-neutral-silver-200 text-lg'>Choose users to be your regular listeners by giving them the key to your chest</h5>
                </div>
        </div>
        <div className='bg-neutral-black w-full rounded-3xl px-6 py-4 xl:py-10 xl:px-20'>
                <PermissionsList data={permissions} /> 
        </div>
      </div>
    </>
  )
}

export default Permissions