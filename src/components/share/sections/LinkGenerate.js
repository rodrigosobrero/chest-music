import React, { useState } from 'react'
import Toggle from 'components/share/Toggle';
import Input from 'components/Input';
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ButtonsContainer from '../ButtonsContainer';
const LinkGenerate = ({ toggleUnlimited }) => {
  const [input, setInput] =  useState('')
  const [isChecked, setIsChecked] = useState(false)
  console.log('input', input)
  const handleCheck = (e) => setIsChecked(e.target.checked)
  const handleChange = (e) => setInput(e.target.value)
  return (
    <> 
      <div className='share-container'>
              <div className='flex md:flex-row flex-col items-start md:items-center w-full md:w-4/5 gap-5'>
                  <div className='w-full md:w-3/4'>
                  <Input label='Play limit' 
                         onChange={handleChange} 
                         required={true} 
                         placeholder={'Only numbers...'} 
                         type="number"/>
                  </div>
                  <div className='w-1/4 flex items-center  pb-5 mb-5 gap-2.5 md:pb-0 md:mb-0'>
                  <Toggle onChange={toggleUnlimited}/>
                  <span className='-mb-7'>Unlimited</span>
                  </div>
              </div>
              <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                  <input type='checkbox' onChange={handleCheck}/> 
                  <label className='text-base font-archivo'>Allow web play</label>
                  <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
              </div>
              <div className='w-full md:w-4/5'>
                  <Input label={'URL'} showClipboard={true} disabled={true}/>
              </div>
      </div>
     </>
  )
}

export default LinkGenerate