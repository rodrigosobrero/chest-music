import React from 'react'
import empty from 'assets/images/empty-chest.svg';
import SharedList from './SharedList'
const SharedTable = ({ artist, data, dispatch }) => {
  
  return (
    <>
      <div className='flex flex-col gap-1 py-3'>
       <div className='bg-neutral-black w-full rounded-t-3xl rounded-b-md flex items-center justify-between 
                         px-[20px] md:px-[60px] py-6 md:pb-6 md:pt-8'>
         {artist &&
            <div className='flex items-center gap-4'>
                <h4 className='font-thunder-bold uppercase text-[48px] leading-[44px]'>{artist}</h4>
                <div className='py-1 px-3 bg-neutral-silver-700 rounded-lg text-neutral-silver-200 font-archivo'>
                  {data?.length} tracks
                </div>
            </div>
          }
        </div>
        <div className='bg-neutral-black rounded-b-[32px] rounded-t-xl pr-4 pt-3  pl-5 md:px-[60px] md:pt-10 pb-[32px]'>
             {data.length > 0 ? <SharedList tracks={data} dispatch={dispatch}/> :               
                      <div className='flex flex-col items-center gap-2'>
                         <h4 className='font-bold !font-archivo !normal-case'>Nothing here</h4>
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