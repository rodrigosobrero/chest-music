import React from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Input from 'components/Input'
import Toggle from '../Toggle'
import ButtonsContainer from '../ButtonsContainer';

const PostTwitter = ({ toggleUnlimited }) => {
  return (
    <>
      <div className='share-container'>
            <div className='md:flex md:flex-row flex-col items-center md:w-4/5 gap-5'>
                <div className='w-3/4'>
                <Input label='Play limit' required={true}placeholder={'Only numbers...'} />
                </div>
                <div className='w-1/4 flex items-center gap-2.5'>
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
                <Input label={'Message'} placeholder={'For example: “Check out my new track”'} />
            </div>
            <div className='w-4/5'>
                <Input label={'URL'} showClipboard={true} disabled={true} value={'https://web.chestmusic.com/track/0xlwJmalM7b'}/>
            </div>
       </div>
       <ButtonsContainer />
     </>
  )
}

export default PostTwitter