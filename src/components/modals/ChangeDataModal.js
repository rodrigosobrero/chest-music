import React from 'react'
import Input from '../Input'
const ChangeDataModal = ({ title , subtitle, inputsData ,toggle, primaryButton, secondaryButton, handleChange, isAvailable}) => {
  return (
    <div className='w-[520px] text-center flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-3'>
          <h3 className='text-center'>{title}</h3>
          {subtitle && <p className='text-lg text-neutral-silver-200'>{subtitle}</p>}
        </div>
        <div className='flex flex-col gap-y-4'>
          {inputsData?.map((el) => {
            return  <Input label={el.label} placeholder={el.placeholder} type={el.type} showHide={el.showHide} name={el.name} onChange={handleChange}/>
          })}
        </div>
        <div className='font-archivo font-semibold flex gap-4'>
          <button onClick={toggle} className='w-full bg-neutral-silver-600 text-white py-2.5 px-6 rounded-lg'>
            {secondaryButton}
          </button>
          <button onClick={toggle} className='w-full disabled:bg-neutral-silver-500 disabled:text-neutral-silver-300
           bg-brand-gold text-black py-2.5 px-6 rounded-lg' disabled={!isAvailable}>
              {primaryButton}
          </button>
       </div>
    </div>
  )
}

export default ChangeDataModal