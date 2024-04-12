import React from 'react';
import { Suspense, lazy } from 'react';
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from '@heroicons/react/24/outline';


const Toast = ({ type, title, body, close }) => {
  const icons = {
    copy: <DocumentDuplicateIcon className='text-brand-gold h-7 w-7'/>
  }
  const icon = icons[type]
  return (
    <>
        <div className='w-[22rem]  flex gap-4 !bg-neutral-silver-600 p-3 !rounded-2xl'>
            <div className='p-3 rounded-xl bg-neutral-black'>
                {icon}
            </div>
            <div className='!text-left'>
                <p className='!text-lg font-semibold'>{title}</p>
                <p className='!text-base !text-left !text-neutral-silver-200'>{body}</p>
            </div>
            <button className='p-2 flex items-center' onClick={close}>
                <XMarkIcon className='!text-neutral-silver-200 h-6 w-6'/>
            </button>
        </div>
    </>
  )
}

export default Toast