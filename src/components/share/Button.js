import React from 'react'

const Button = ({ isActive, icon, text, className}) => {
  
  return (
    <>
    <div className='flex flex-col'>
        <button className={`py-3 px-4 font-archivo font-semibold text-base  rounded-xl flex items-center gap-x-2 ${className}
                       ${isActive ? 'bg-brand-gold text-neutral-black' : 'bg-neutral-silver-700 text-neutral-silver-200'}`}>
            {icon}
            {text}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${!isActive && 'hidden'}`}></div>
    </div>
    </>
  )
}

export default Button