import React from 'react'
import { useLocation } from 'react-router-dom';
import Ubication from 'components/Ubication';
import data from 'data/recently.json'
import RecentlyList from 'components/profile/RecentlyList';
const Played = () => {
  const location = useLocation();
  return (
    <>
       <Ubication path={location.pathname}/>
       <div className='flex flex-col mt-5 mb-8'>
        <div >
            <h3 className='font-thunder-bold text-5xl font-bold'>Recently played</h3>
            <h5 className='text-neutral-silver-200 text-lg'>Explore the list of tracks that you have recently listened</h5>
        </div>
       </div>
       <div className='bg-neutral-black rounded-3xl px-[12px]  xl:px-[60px] xl:pt-10 pb-[60px]'>
            <RecentlyList data={data}/>
       </div>
    </>
  )
}

export default Played