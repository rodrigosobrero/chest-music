import React from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
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
            <Button onClick={toggle} style='third' text={secondaryButton}/>
            <Button onClick={onClick} style='primary' text={primaryButton} disabled={!disabled}/>
        </div>
    </div>
  )
}

export default DeleteModal