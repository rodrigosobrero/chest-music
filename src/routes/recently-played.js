import React from 'react'
import data from 'data/recently.json'
import RecentlyList from 'components/profile/RecentlyList';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'components/Breadcrumb';
const Played = () => {
  // const location = useLocation();
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[0].title }]
  return (
    <>
    <div className='pb-10'>
    <Breadcrumb className='px-0' items={paths}/>
       <div className='flex flex-col mt-5 mb-8'>
        <div className='xl:p-0 px-3'>
            <h3 className='font-thunder-bold text-5xl font-bold'>{items[0].title}</h3>
            <h5 className='text-neutral-silver-200 text-lg'>{t('recently.subtitle')}</h5>
        </div>
       </div>
       <div className='bg-neutral-black rounded-3xl px-[12px]  xl:px-[60px] xl:pt-10 pb-[60px]'>
            <RecentlyList data={data}/>
       </div>
    </div>
    </>
  )
}

export default Played