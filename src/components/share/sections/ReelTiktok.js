import React from 'react'
import { ClockIcon, CloudIcon  } from "@heroicons/react/20/solid";
import ButtonsContainer from '../ButtonsContainer';
import { useNavigate } from 'react-router-dom';


const Reel = () => {
    const navigate = useNavigate()
    const onClick = () =>{
        navigate('/share/instagram/232')
    }
  return (
    <>    
        <div className='share-container'>
            <div className='py-4 flex flex-col gap-y-6'>
                <p className='text-base text-neutral-silver-200'>Chest will generate a video preview of your track for you to share in your TikTok story.</p>
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
        <ButtonsContainer primaryButton={'Share'} onClick={onClick}/>
    </>
  )
}

export default Reel