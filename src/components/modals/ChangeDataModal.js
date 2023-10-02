import React from 'react'
import Input from '../Input'
const ChangeDataModal = ({ title , subtitle, inputsData ,toggle, primaryButton, secondaryButton}) => {
  return (
    <div className='w-[520px] p-8 text-center flex flex-col gap-y-8'>
        <div>
          <h3>{title}</h3>
          <p className='text-lg text-neutral-silver-200'>{subtitle}</p>
        </div>
        <div className='flex flex-col gap-y-4'>
          {inputsData?.map((el) => {
            return  <Input label={el.label} placeholder={el.placeholder} type={el.type} showHide={el.showHide}/>
          })}
        </div>
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

export default ChangeDataModal