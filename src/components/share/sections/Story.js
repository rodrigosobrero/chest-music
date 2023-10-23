import React from 'react'
import { ClockIcon, CloudIcon  } from "@heroicons/react/20/solid";
import ButtonsContainer from '../ButtonsContainer';


const Story = () => {
  return (
    <>
    <div className='share-container'>
       <div className='py-4 flex flex-col gap-y-6'>
            <p className='text-base text-neutral-silver-200'>Chest will generate a video preview of your track for you to share in your Instagram story.</p>
            <div className='w-full items-center justify-center flex gap-5'>
                <span className='flex gap-1.5 items-center'>
                    <ClockIcon className="h-5 w-5 text-brand-uva-light" />
                    3:56
                </span>
                <span className='flex gap-1.5 items-center'>
                    <CloudIcon  className="h-5 w-5 text-brand-uva-light" />
                    10 Mb               
                </span>
            </div>
        </div>
    </div>
        <ButtonsContainer primaryButton={'Create'} />
    </>
  )
}

export default Story