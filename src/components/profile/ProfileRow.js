import React from 'react'
import { MusicalNoteIcon, XMarkIcon, LinkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
const ProfileRow = ({ title, subtitle }) => {
  return (
    <>
       <div className='font-archivo  mx-auto bg-neutral-black p-4 flex items-center space-x-4 rounded-xl'>  
            <div className={'bg-neutral-silver-700 rounded-lg flex justify-center items-center h-10 w-10'}>
                <MusicalNoteIcon  className='h-5 w-5 text-brand-gold' />
            </div>
            <div>
                <h4 className='text-lg font-archivo font-semibold'>{title}</h4>
                <h4 className='text-base text-neutral-silver-300'>{subtitle}</h4>
            </div>
       </div>
    </>
  )
}

export default ProfileRow