import React from 'react'
import Breadcrumb from 'components/Breadcrumb'
import { useTranslation } from 'react-i18next'
import { useGetTermsQuery } from 'store/api'
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { useFetch } from 'hooks/useFetch';
import { useSelector } from 'react-redux';
import spinner from 'assets/images/icon-loading-claim.png';
import empty from 'assets/images/empty-chest.svg';
import ReferralList from 'components/profile/ReferralList'

const Referral = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name: t('global.profile'), link: '/profile' }, { name: items[0].title }]
  
  const user = useSelector((state) => state.auth.user)
  const { data, handleToggle , isFetching } = useFetch(process.env.REACT_APP_API + 'account/referrals/', user?.token )
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.ambassador_url).then(() => {
      console.log(data?.ambassador_url);
      console.log(data);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  }


  return (
    <>
      <div className='pt-4 pb-10 px-3 md:container md:pt-10 md:px-[120px] md:pb-[60px]'>
       <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
            <div className='container-items-account'>
                <h3 className='font-thunder-bold !text-5xl !font-bold'>{t(items[0].title)}</h3>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl md:p-8 flex flex-row gap-10'>
            <div className='ml-8 mr-6 flex flex-col gap-y-6 w-3/5'>
            <h4 className='!text-lg !font-archivo !normal-case'>{t('referral.title')}</h4>
            <p className='!text-base text-neutral-silver-200 !font-archivo !text-left'>{t('referral.text')}</p>
            </div>
            <div className='  flex flex-col gap-y-4 w-2/5'>
            <div className=' flex flex-row'>
            <h4 className='!text-lg !font-archivo !normal-case w-4/5'>{t('referral.share_code')}</h4>
            <button
             className='flex items-center group'
             onClick={copyToClipboard}
             >
                <h4 className='!text-lg !font-archivo !normal-case mr-1 text-brand-gold group-hover:text-orange-400'>{t('referral.copy')}</h4>
                <Square2StackIcon className='inline-flex h-6 w-6 text-brand-gold group-hover:text-orange-400' />
            </button>
            </div>
            <div className='bg-neutral-silver-700 rounded-3xl md:p-8 py-8 px-6 flex flex-row'>
            <h4 className='!text-lg !font-archivo !normal-case text-neutral-silver-300 truncate'>{data?.ambassador_url}</h4>
            </div>
            </div>

        </div>
        <div className='bg-neutral-black rounded-t-3xl rounded-b-lg md:p-8 flex flex-row mt-8'>
            <div className='container-items-account'>
                <h3 className='font-thunder-bold !text-5xl !font-bold ml-8'>{t('referral.my_referrals')}</h3>
            </div>
        </div>
        <div className='bg-neutral-black rounded-b-3xl rounded-t-lg md:p-8 flex flex-row mt-1.5'>
        {isFetching ? 
                  <img src={spinner} alt='' width={20} height={20} className='animate-spin' /> : data.length >  0 ? <ReferralList data={data} /> :            
                    <div className='flex flex-col items-center gap-2'>
                        <h4 className='empty-title'>{t('notification.nothing_here')}</h4>
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

export default Referral