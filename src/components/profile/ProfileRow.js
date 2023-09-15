import React from 'react'
import { MusicalNoteIcon, XMarkIcon, LinkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';


const ProfileRow = ({ title, subtitle, to }) => {
  return (
    <>
       <div className='font-archivo mx-auto bg-neutral-black p-4  rounded-xl flex items-center justify-between'>  
            <div className='flex items-center space-x-4'>
                <div className={'bg-neutral-silver-700 rounded-xl flex justify-center items-center p-4'}>
                    <MusicalNoteIcon  className='h-7 w-7 text-brand-gold' />
                </div>
                <div>
                    <h4 className='text-lg font-archivo font-semibold'>{title}</h4>
                    <h4 className='text-base text-neutral-silver-300'>{subtitle}</h4>
                </div>
            </div>
            <div>
             <NavLink to={to}>
                <ChevronRightIcon className='h-6 w-6 text-silver-gray-200' />
             </NavLink>
            </div>
       </div>
    </>
  )
}

export default ProfileRow