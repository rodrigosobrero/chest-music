import React from 'react'
import Input from 'components/Input'
const DeleteModal = ({ title, subtitle, confirmText, primaryButton, secondaryButton, toggle, placeholder, disabled, onChange, onClick }) => {
  console.log('dis', disabled)
  return (
    <div className='md:w-[32rem] text-center flex flex-col  gap-y-8'>
        <div className='flex flex-col gap-y-4'>
            <h3 className='text-[48px] text-center'>{title}</h3>
            <p className='text-neutral-silver-200 text-lg'>{subtitle}</p>
            <p className='text-lg'>{confirmText}</p>
        </div>
         <Input placeholder={placeholder} onChange={onChange}/>
        <div className='font-archivo font-semibold flex gap-4'>
            <button onClick={toggle} className='w-full bg-neutral-silver-600 text-white py-2.5 px-6 rounded-lg'>
                {secondaryButton}
            </button>
            <button onClick={onClick} className='w-full bg-brand-gold text-black py-2.5 px-6 
                    rounded-lg disabled:bg-neutral-silver-500 disabled:text-neutral-silver-300'  disabled={!disabled}>
                 {primaryButton}
            </button>
        </div>
    </div>
  )
}

export default DeleteModal