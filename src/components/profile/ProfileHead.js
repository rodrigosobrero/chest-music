import React from 'react'
import ProgressBar from 'components/ProgressBar'
import cloud from 'assets/images/icon-cloud-upload.svg'
import pencil from 'assets/images/icon-pencil-alt.svg'
const ProfileHead = () => {
  const storage = 1000
  const used = 242.2
  return (
        <div className='flex w-full flex-col xl:flex-row xl:justify-between xl:items-center'>
            <div className='flex items-center gap-x-4'>
                <h3 className='font-thunder-bold text-[64px] leading-[68px] xl:text-[76px] font-bold'>Agustin Posse</h3>
                <button className='p-2 flex items-center'>
                    <img src={pencil} alt='' width={24} height={24} className='xl:flex hidden' />
                </button>
            </div>
            <div className='flex justify-between flex-row-reverse xl:flex-row items-center gap-x-4'>
                <div className='flex flex-col items-end'>
                    <span className='text-right text-neutral-silver-100 xl:text-[14px] leading-[18px]'>
                        {used} Mb <span className='text-neutral-silver-300 leading-[18px] tracking-[0.14px]'> of </span> {storage/1000}GB
                    </span>
                    <ProgressBar 
                    progress={100 * 242.3 / 1000} 
                    color='orange'
                    size='full'
                    direction='right'
                    background='gray' />
                </div>
                <div className='flex items-center flex-row-reverse xl:flex-row xl:gap-x-4 gap-x-3'>
                    <span className='text-brand-gold font-thunder font-normal leading-9	text-4xl tracking-[0.36px]'>{Math.round((used / storage) * 100)}%</span>
                    <button className='p-2 bg-brand-gold rounded-[10px] cursor-pointer'>
                        <img src={cloud} alt='' width={28} height={28}  />
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ProfileHead