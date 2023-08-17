import React from 'react'

import SharedList from './SharedList'
const SharedTable = ({artist, data}) => {
  console.log(data)
  return (
    <>
        <div className='bg-neutral-black pb-6 pt-8 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-[60px] '>
          <div className='flex items-center gap-4'>
            <h4 className='font-thunder uppercase text-[48px] font-bold'>{artist}</h4>
            <div className='py-1 px-3 bg-neutral-silver-700 rounded-lg text-neutral-silver-200 font-archivo'>
              {data?.length} tracks
            </div>
          </div>
        </div>
        <div className='bg-neutral-black rounded-b-[32px] rounded-t-xl px-[60px] pt-10 pb-[60px]'>
              <SharedList tracks={data} /> 
        </div>
     </>
  )
}

export default SharedTable;