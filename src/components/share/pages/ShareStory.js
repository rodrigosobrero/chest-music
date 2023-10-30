import React, { useEffect } from 'react'
import logo from 'assets/images/logo.svg';
import Breadcrumb from 'components/Breadcrumb'
import cover from 'assets/images/cover-slide-1.jpeg'
import ButtonsContainer from '../ButtonsContainer';
import AudioWaveform from '../Sound';
import { PlayIcon } from "@heroicons/react/24/solid";
  
const ShareStory = () => {
  const breadcrumbItems = [
    { name: 'Go back', link: '/share/3232' },
  ];
  return (
    <>
        <div className='flex flex-col items-start w-full py-4 px-1'>
            <Breadcrumb items={breadcrumbItems} className='px-5'/>
            <div className='bg-neutral-black w-full rounded-3xl py-6 px-3'>
              <div className='flex justify-center w-full'>
                <img src={logo} alt="Chest" width={146} height={32} className='w-[110px] h-[24px] md:w-[146px] md:h-[32px]' />
              </div>
              <div className='py-2.5 px-5 '>
                <div className='bg-neutral-silver-700 pt-7  flex flex-col justify-center items-center rounded-[20px]'>
                  <img src={cover} className='h-[250px] w-[250px] rounded'/>
                  <div className='h-[121.03px] rounded-[20px] w-full backdrop-filter bg-blur-[22px] bg-[#43474f4e] flex justify-center items-center'>
                    <div>
                      <h3 className='uppercase font-thunder-bold text-[31px] leading-[27.664px]'>
                         just a feeling
                      </h3>
                      <p className='text-[13px] text-neutral-silver-200'>
                         Agustin Posse
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ButtonsContainer primaryButton={'Share'} />
            {/* <div className='w-full flex items-center justify-center gap-3'>
               <button className='px-3 rounded-lg py-4 bg-neutral-silver-600 -mb-10'>
                  <PlayIcon className="h-6 w-6 text-white" />
               </button>
               <AudioWaveform />
            </div> */}
        </div>
    </>
  )
}

export default ShareStory