import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import cover_track from 'assets/images/cover-track.png'
import rectangle from 'assets/images/icon-rectangle.png'
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { playing } from 'app/playlist';

const SharedPlay = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const [track, setTrack] = useState({})
  
  useEffect(() => {
    const token = searchParams.get('token')
    if(!token) return;
    axios.get(process.env.REACT_APP_API + 'shared/link/token/' + token).then((response) => {
      setTrack(response.data)
      dispatch(playing({
        id: response.data.version_name,
        album: response.data.album,
        cover: response.data.cover_url,
        name: response.data.title,
        authors: response.data.authors,
        type: 'project', 
        audio: response.data.audio_url
      }));
    })
    // return () => {
    //   dispatch()
    // }
  }, [searchParams])
  return (
    <>
     <div className='lg:block hidden lg:container'>
        <div className='lg:pt-[60px] lg:pb-[40px] flex lg:gap-x-12 items-center'>
            <div>
               <img src={track?.cover_url} className='lg:w-[220px] lg:h-[220px] lg:rounded-lg' alt='cover track' />
            </div>
            <div className='flex flex-col '>
               <div className='lg:mb-6'>
                    <p className='text-left text-neutral-silver-200 !text-base flex items-center gap-2'>
                     {track?.album} 
                     <img src={rectangle} alt='rectangle' className='h-[3px]'/> 
                     {track?.version_name}
                    </p>
               </div>
               <div className='lg:mb-3'>
                    <h2 className='lg:!text-[76px] !leading-[68px] !font-thunder-bold'>{track?.title}</h2>
               </div>
               <div>
                    <p className='text-left lg:!text-[22px] capitalize'>{track?.authors?.join(', ')}</p>
               </div>
            </div>
        </div>
        <div className='lg:pt-[20px] lg:pb-[80px]'>
            <div className='lg:p-10 bg-neutral-black flex lg:gap-x-20 rounded-2xl'>
              <div className='w-2/4 h-full flex flex-col gap-y-6'>
                <h3 className='!text-[64px] !font-thunder-bold pr-10 leading-[58px] text-neutral-silver-200'>
                   If your music is your <br />treasure, it deserves  <br/> to have its chest.
                </h3>
                <div>
                   <Button text='Open chest' style='primary' customStyle='!w-auto' />
                </div>
              </div>
              <div className='w-2/4'>
                <img src={cover_track} alt='cover' className='w-[620px] h-[300px] rounded-lg' />
              </div>
            </div>
        </div>
     </div>
     <div className='p-3  h-full bg-neutral-black lg:hidden'>
        <div className='w-full h-[510px] bg-neutral-silver-700 rounded-3xl py-2'>
          <div className='mb-5 py-2'>
            <p className='capitalize !text-lg font-semibold'>
              {track?.album}
            </p>
          </div>
          <div className='flex justify-center'>
            <img src={track?.cover_url} alt='cover' className='w-[286px] h-[286px] rounded-md'/>
          </div>
          <div className='h-[160px] rounded-[20px] px-5 py-2 w-full bg-custom-opacity flex flex-col justify-center items-center'>
              <h5 className='uppercase font-thunder-bold !text-[36px] !leading-[32px]'>
                {track?.title}
              </h5>
              <p className='!text-base text-neutral-silver-200 capitalize'>
                 {track?.authors?.join(', ')}
               </p>
          </div>
        </div>

     </div>
    </>
  )
}

export default SharedPlay