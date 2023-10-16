import React from 'react'
import Toggle from 'components/share/Toggle';
import Input from 'components/Input';
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
const LinkGenerate = ({ toggleUnlimited }) => {
  return (
    <>
            <div className='flex md:flex-row flex-col items-center md:w-4/5 gap-5'>
                <div className='w-3/4'>
                <Input label='Play limit' required={true}placeholder={'Only numbers...'} />
                </div>
                <div className='w-1/4 flex items-center'>
                <Toggle onChange={toggleUnlimited}/>
                <span className='-mb-7'>Unlimited</span>
                </div>
            </div>
            <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                <input type='checkbox'/> 
                <label className='text-base font-archivo'>Allow web play</label>
                <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
            </div>
            <div className='w-4/5'>
                <Input label={'URL'} showClipboard={true} disabled={true}/>
            </div>
     </>
  )
}

export default LinkGenerate