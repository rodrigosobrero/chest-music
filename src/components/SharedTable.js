import React from 'react'
import empty from 'assets/images/empty-chest.svg';
import SharedList from './SharedList'
const SharedTable = ({artist, data}) => {
  console.log(data)
  return (
    <>
      <div className='flex flex-col gap-1'>
       <div className='bg-neutral-black pb-6 pt-8 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-[60px] '>
         {artist && <div className='flex items-center gap-4'>
            <h4 className='font-thunder uppercase text-[48px] font-bold'>{artist}</h4>
            <div className='py-1 px-3 bg-neutral-silver-700 rounded-lg text-neutral-silver-200 font-archivo'>
              {data?.length} tracks
            </div>
          </div>}
        </div>
        <div className='bg-neutral-black rounded-b-[32px] rounded-t-xl px-[60px] pt-10 pb-[60px]'>
             {data.length > 0 ?  <SharedList tracks={data} /> :               
                      <div className='flex flex-col items-center gap-2'>
                         <h4>Nothing here</h4>
                         <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                             Nobody shared a track with you yet
                         </p>
                         <img src={empty} alt='' width={240} height={128} className='mb-5' />
                      </div>
              }
        </div>
      </div>
     </>
  )
}

export default SharedTable;