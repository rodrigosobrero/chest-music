import React, { useState } from 'react'
import TabIcon from './share/TabIcon'

const TabButton = ({ isActive, icon, text, counter, className, onClick}) => {
  const [isHovered, setIsHovered] = useState(false)
  const toggle = () => setIsHovered(!isHovered)
  
  return (
    <>
    <div className='flex flex-col'>
        <button onClick={onClick}  onMouseEnter={toggle} onMouseLeave={toggle}
                className={`tab-btn ${isActive && 'isActive'} transition-colors duration-600 ${className}` }>
                {icon && <TabIcon type={icon}/>}
                {text}
                {counter !== undefined && <span className={`px-1 h-5 w-5 text-center rounded-[40px] bg-neutral-silver-600 ${isActive && '!bg-brand-gold '}`}>{counter}</span>}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${!isActive && 'hidden'}`}></div>
    </div>
    </>
  )
}

export default TabButton