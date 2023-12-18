import React from 'react'
import Input from '../Input'
import Button from 'components/Button'
const ChangeDataModal = ({ title , subtitle, inputsData ,toggle, primaryButton, secondaryButton, handleChange, isAvailable, value, onClick }) => {
  return (
    <div className='w-full md:w-[520px] text-center flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-3'>
          <h3 className='text-center'>{title}</h3>
          {subtitle && <p className='text-lg text-neutral-silver-200'>{subtitle}</p>}
        </div>
        <div className='flex flex-col gap-y-4'>
          {inputsData?.map((el,i) => {
            return  <Input label={el.label} key={`input-${i}`} onlyNumeric={el.onlyNumeric} error={el.error}
                  id={el.id} placeholder={el.placeholder} value={el.value} disabled={el.disabled} 
                  type={el.type} showHide={el.showHide} name={el.name} onChange={handleChange}/>
          })}
        </div>
        <div className='font-archivo font-semibold flex gap-4'>
          <Button onClick={toggle} style='third' text={secondaryButton}/>
          <Button onClick={onClick} style='primary' text={primaryButton} disabled={!isAvailable}/>
       </div>
    </div>
  )
}

export default ChangeDataModal