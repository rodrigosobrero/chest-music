import React from 'react'
import GeneralRow from './GeneralRow'
import empty from 'assets/images/empty-chest.svg';

const GeneralList = ({data}) => {
  return (
    <>
      <div className='space-y-[12px]'>
          {data.length > 0 ? data.map((el) => (
              <GeneralRow notification={el}/> 
          )) : 
          <div className='flex flex-col items-center gap-2'>
              <h4>Nothing here</h4>
              <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                 You haven’t received any General yet
              </p>
              <img src={empty} alt='' width={240} height={128} className='mb-5' />
          </div>
       }
      </div>
    </>  )
}

export default GeneralList