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
    <div className='md:container px-3 pb-10 pt-4  gap-y-6 md:pt-10 md:pb-[60px] md:px-[120px] md:gap-y-8'>
      <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
         <div className='container-items-account'>
            <h3 className='font-thunder-bold text-5xl font-bold'>{items[0].title}</h3>
            <h5 className='text-neutral-silver-200 md:text-base text-lg'>{t('recently.subtitle')}</h5>
         </div>
       </div>
       <div className='bg-neutral-black rounded-3xl px-4 pt-6 pb-8 md:p-[60px] md:pt-10'>
            <RecentlyList data={data}/>
       </div>
    </div>
    </>
  )
}

export default Played