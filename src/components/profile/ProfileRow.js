import React from 'react'
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar'
import cloud from 'assets/images/icon-cloud-upload.svg'
import pencil from 'assets/images/icon-pencil-alt.svg'

const ProfileRow = ({ title, subtitle, to, icon }) => {
  return (
    <>
    <div>
      <NavLink to={to}>
        <div className='font-archivo mx-auto bg-neutral-black p-4  xl:pr-6 rounded-xl flex items-center gap-x-2 justify-between'>  
              <div className='flex items-center gap-x-4'>
                  <div className={'bg-neutral-silver-700 rounded-xl flex justify-center items-center p-3'}>
                      {icon}
                  </div>
                  <div className='flex flex-col'>
                      <span className='text-lg font-archivo font-semibold'>{title}</span>
                      <span className='text-base text-neutral-silver-300'>{subtitle}</span>
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