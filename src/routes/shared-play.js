import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import cover_track from 'assets/images/cover-track.png'
import { apiUrl } from 'utils/api';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { playing } from 'app/playlist';

const SharedPlay = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const [track, setTrack] = useState({})
  const navigate = useNavigate()

  const playTrack = () => {

  };
  
  useEffect(() => {
    const token = searchParams.get('token')
    if(!token) return;
    axios.get(apiUrl + 'shared/link/token/' + token).then((response) => {
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
  }, [searchParams])

  return (
    <>
     <div className=' lg:container'>
        <div className='lg:pt-[60px] lg:pb-[40px] flex lg:gap-x-12 items-center'>
            <div>
               <img src={track?.cover_url} className='lg:w-[220px] lg:h-[220px] lg:rounded-lg'/>
            </div>
            <div className='flex flex-col '>
               <div className='lg:mb-6'>
                    <p className='text-left text-neutral-silver-200 text-base'>{track?.album} -- {track?.version_name}</p>
               </div>
               <div className='lg:mb-3'>
                    <h2 className='lg:text-[76px] leading-[68px] !font-thunder-bold'>{track?.title}</h2>
               </div>
               <div>
                    <p className='text-left lg:text-[22px] capitalize'>{track?.authors?.join(', ')}</p>
               </div>
            </div>
        </div>
        <div className='lg:pt-[20px] lg:pb-[80px]'>
            <div className='lg:p-10 bg-neutral-black flex lg:gap-x-20 '>
              <div className='w-2/4 h-full flex flex-col gap-y-6'>
                <h3 className='!text-[64px] !font-thunder-bold pr-10 leading-[58px] text-neutral-silver-200'>
                   If your music is your <br />treasure, it deserves  <br/> to have its chest.
                </h3>
                <div>
                   <Button text='Open chest' style='primary' customStyle='!w-auto'  onClick={() => { navigate('/sign-in') }} />
                </div>
              </div>
              <div className='w-2/4'>
                <img src={cover_track} className='w-[620px] h-[300px] rounded-lg' />
              </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default SharedPlay