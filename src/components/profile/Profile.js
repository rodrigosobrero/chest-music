import React from 'react'
import { useTranslation } from 'react-i18next'
import ProfileRow from './ProfileRow'
import ProgressBar from 'components/ProgressBar'
import cloud from 'assets/images/icon-cloud-upload.svg'
import pencil from 'assets/images/icon-pencil.svg'
import Ubication from 'components/Ubication'
import { useLocation } from 'react-router-dom'
const ProfileView = () => {
  const { t } = useTranslation() 
  const location = useLocation()
  const items = t('profile.sections', { returnObjects: true });
  const storage = 1000
  const used = 242.2
  const paths = [ 'played', 'permissions', 'account', 'security', 'help', 'terms']
  return (
    <>
       <Ubication path={location.pathname}/>
       <div className='w-3/5 flex flex-col justify-center mx-auto items-center gap-y-10'>
            <div className='flex w-full justify-between items-center'>
                <div className='flex items-center gap-x-4'>
                    <h3 className='font-thunder-bold text-[76px] font-bold'>Agustin Posse</h3>
                    <img src={pencil} alt='' width={25} height={25} />
                </div>
                <div className='flex items-center gap-x-4'>
                    <div className='flex flex-col items-end '>
                        <span className='text-right text-neutral-silver-100'>{used} Mb <span className='text-neutral-silver-300'> of </span> {storage/1000}GB</span>
                        <ProgressBar 
                        progress={100 * 242.3 / 1000} 
                        color='orange'
                        size='150'
                        direction='right'
                        background='gray' />
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <span className='text-brand-gold text-4xl'>{Math.round((used / storage) * 100)}%</span>
                        <div className='bg-brand-gold py-2 rounded-[10px] w-12 h-12 cursor-pointer'>
                              <img src={cloud} alt='' width={28} height={28} className='mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-4 w-full'>
                    {items?.map((el, i) => (
                            <ProfileRow title={el.title} subtitle={el.subtitle} to={paths[i]}/>
                    ))}
            </div>
            <button className='w-[142.667px] bg-neutral-silver-600 py-3 px-6 rounded-[10px]'>Log out</button>
       </div>
    </>
  )
}

export default ProfileView