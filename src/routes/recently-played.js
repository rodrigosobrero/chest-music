import React from 'react'
import RecentlyList from 'components/profile/RecentlyList';
import { useTranslation } from 'react-i18next';
import Breadcrumb from 'components/Breadcrumb';
import { apiUrl } from 'utils/api';
import { useFetch } from 'hooks/useFetch';
import { useSelector } from 'react-redux';
import empty from 'assets/images/empty-chest.svg';

const Played = () => {
  const user = useSelector((state) => state.auth.user) 
  const { data, isFetching, error } = useFetch(apiUrl + 'recentlyplayed/', user?.token )
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[0].title }]
  return (
    <>

    <div className='md:container px-3 pb-10 pt-4  gap-y-6 md:pt-10 md:pb-[60px] md:px-[120px] md:gap-y-8 w-full'>
      <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
         <div className='container-items-account'>
            <h3 className='font-thunder-bold text-5xl font-bold'>{items[0].title}</h3>
            <span className='!font-archivo !text-neutral-silver-200 !md:text-base !text-lg'>{t('recently.subtitle')}</span>
         </div>
       </div>
       <div className='bg-neutral-black rounded-3xl px-4 pt-6 pb-8 md:p-[60px] md:pt-10'>
            {data.length > 0 ?
                    <RecentlyList data={data}/> :
                    <div className='flex flex-col items-center gap-2'>
                    <h4>{t('notification.nothing_here')}</h4>
                    <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                      {t('notification.not_general')}
                    </p>
                    <img src={empty} alt='' width={240} height={128} className='mb-5' />
                </div>
            }
       </div>
    </div>
    </>
  )
}

export default Played