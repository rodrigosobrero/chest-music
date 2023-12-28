import React, { useState } from 'react'
import TabIcon from './share/TabIcon'

const TabButton = ({ isActive, icon, text, className, onClick}) => {
  const [isHovered, setIsHovered] = useState(false)
  const toggle = () => setIsHovered(!isActive)
  
  return (
    <>
    <div className='flex flex-col'>
        <button onClick={onClick} onMouseOvers={toggle} onMouseLeave={toggle}
        className={`py-3 px-4 font-archivo font-semibold text-base  rounded-xl flex items-center gap-x-2 
                  bg-neutral-silver-700 text-neutral-silver-200 hover:text-brand-gold hover:border-brand-gold
                    ${isActive && '!bg-brand-gold !text-neutral-black'}
                    transition-colors duration-600 ${className}` }>
            {icon && <TabIcon type={icon} s={(isHovered || isActive) ? 'actived' : 'disabled' }/>}
            {text}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${!isActive && 'hidden'}`}></div>
    </div>
    </>
  )
}

export default TabButton