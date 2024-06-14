import React from 'react'
import Breadcrumb from 'components/Breadcrumb'
import { useTranslation } from 'react-i18next'
import { useGetTermsQuery } from 'store/api'
import { Square2StackIcon } from "@heroicons/react/24/outline";
const Referal = () => {
  const { t, i18n } = useTranslation() 
  const { data: terms = [] } = useGetTermsQuery(i18n.language === 'en' ? 'english' : 'spanish', { refetchOnMountOrArgChange: true })
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name: t('global.profile'), link: '/profile' }, { name: items[0].title }]

  

  return (
    <>
      <div className='pt-4 pb-10 px-3 md:container md:pt-10 md:px-[120px] md:pb-[60px]'>
       <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
            <div className='container-items-account'>
                <h3 className='font-thunder-bold !text-5xl !font-bold'>{t(items[0].title)}</h3>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl md:p-8 py-8 px-6 flex flex-row'>
            <div className='md:p-8 py-8 px-6 flex flex-col gap-y-6 w-3/5'>
            <h4 className='!text-lg !font-archivo !normal-case'>{t('referal.title')}</h4>
            <p className='!text-base text-neutral-silver-200 !font-archivo !text-left'>{t('referal.text')}</p>
            </div>
            <div className='  flex flex-col gap-y-4 w-2/5'>
            <div className=' flex flex-row'>
            <h4 className='!text-lg !font-archivo !normal-case w-4/5'>Compartí tu código</h4>
            <button
             className='flex items-center'
             onClick={()=>console.log('hola')}
             >
                <h4 className='!text-lg !font-archivo !normal-case mr-1 text-brand-gold'>Copiar</h4>
                <Square2StackIcon className='inline-flex h-6 w-6 text-brand-gold' />
            </button>
            </div>
            <div className='bg-neutral-silver-700 rounded-3xl md:p-8 py-8 px-6 flex flex-row'>
            <h4 className='!text-lg !font-archivo !normal-case text-neutral-silver-300'>https://chestmusic.com/beta/1294tn2389sfgeh</h4>

            </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Referal