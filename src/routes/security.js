import React from 'react'
import { useLocation } from 'react-router-dom';
import Ubication from 'components/Ubication';
const Security = () => {
    const location = useLocation();
    return (
      <>
      <div className='px-20'>
         <Ubication path={location.pathname}/>
         <div className='flex flex-col mt-5 mb-8'>
          <div>
              <h3 className='font-thunder-bold text-5xl font-bold'>Security</h3>
              <h5 className='text-neutral-silver-200 text-lg'>Change your password, set your PIN Code and learn more about our security</h5>
          </div>
         </div>
         <div className='w-full flex flex-col gap-y-6'>
            <div className='w-full flex space-x-6'>
                <div className='w-2/4 p-8 bg-neutral-black rounded-2xl'>
                    <div>
                        pin code
                    </div>
                    <div>edit</div>
                </div>
                <div className='w-2/4 p-8 bg-neutral-black rounded-2xl'>
                </div>
            </div>
            <div className='w-full bg-neutral-black p-8 rounded-3xl'>
                <h4 className='font-archivo text-[22px]'>Chest keeps your treasure secure</h4>
                <p className='text-neutral-silver-200 text-left'>
                    Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu.
                </p>
                <a className='font-archivo text-xl text-brand-gold' href='!#'>
                    Learn more
                </a>
            </div>
         </div>
        </div>
      </>
    )
}

export default Security