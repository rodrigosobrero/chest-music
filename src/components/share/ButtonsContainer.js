import React from 'react'

const ButtonsContainer = ({ primaryButton, onClick }) => {
  let disabled = false;
  return (
    <div className='md:max-w-md w-full flex md:gap-5 gap-4 md:mt-6 mt-4 font-semibold font-archivo text-xl px-6 md:px-0'>
        <button className='px-6 py-3 w-full bg-neutral-silver-600 rounded-[10px]'>Cancel</button>  
        <button onClick={onClick} className='px-6 py-3 w-full bg-brand-gold rounded-[10px] text-neutral-black' disabled={disabled}>{primaryButton}</button>           
    </div>
  )
}

export default ButtonsContainer