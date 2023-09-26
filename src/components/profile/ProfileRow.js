import React from 'react'
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';


const ProfileRow = ({ title, subtitle, to, icon }) => {
  console.log(to)
  return (
    <>
    <div>
      <NavLink to={to}>
        <div className='font-archivo mx-auto bg-neutral-black p-4 pr-6 rounded-xl flex items-center justify-between'>  
              <div className='flex items-center space-x-4'>
                  <div className={'bg-neutral-silver-700 rounded-xl flex justify-center items-center p-3'}>
                      {icon}
                  </div>
                  <div>
                      <h4 className='text-lg font-archivo font-semibold'>{title}</h4>
                      <h4 className='text-base text-neutral-silver-300'>{subtitle}</h4>
                  </div>
              </div>
              <div>
                  <ChevronRightIcon className='h-6 w-6 text-silver-gray-200' />
              </div>
        </div>
      </NavLink>

    </div>
    </>
  )
}

export default ProfileRow