import React from 'react'
import Input from 'components/Input'
const DeleteModal = ({ title, subtitle, confirmText, primaryButton, secondaryButton, toggle, placeholder }) => {
  return (
    <div className='w-[32rem] p-8 text-center flex flex-col  gap-y-8'>
        <div className='flex flex-col gap-y-4'>
            <h3 className='text-[48px]'>{title}</h3>
            <p className='text-neutral-silver-200 text-lg'>{subtitle}</p>
            <p className='text-lg'>{confirmText}</p>
            </div>
            <Input placeholder={placeholder}/>
                <div className='font-archivo font-semibold flex gap-4'>
            <button onClick={toggle} className='w-full bg-neutral-silver-600 text-white py-2.5 px-6 rounded-lg'>
                {secondaryButton}
            </button>
            <button onClick={toggle} className='w-full bg-brand-gold text-black py-2.5 px-6 rounded-lg'>
                {primaryButton}
            </button>
        </div>
    </div>
  )
}

export default DeleteModal