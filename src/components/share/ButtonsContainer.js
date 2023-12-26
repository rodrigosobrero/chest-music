import Button from 'components/Button'
import React from 'react'

const ButtonsContainer = ({ primaryButton, onClick, disabled, onCancel }) => {
  return (
    <div className='md:max-w-md w-full flex md:gap-5 gap-4 md:mt-6 mt-4 font-semibold font-archivo text-xl px-6 md:px-0'>
        <Button style='tertiary' text='Cancel' onClick={onCancel}/>
        {/* <button className='px-6 py-3 w-full bg-neutral-silver-600 !text-lg rounded-[10px]'>Cancel</button>   */}
        <Button style='primary' text={primaryButton} onClick={onClick} disabled={disabled}/>
         
    </div>
  )
}

export default ButtonsContainer