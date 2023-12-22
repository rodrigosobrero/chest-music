import React from 'react'
import Breadcrumb from 'components/Breadcrumb'
import { useTranslation } from 'react-i18next'
import { useGetTermsQuery } from 'store/api'
const Terms = () => {
  const { t, i18n } = useTranslation() 
  const { data: terms = [] } = useGetTermsQuery(i18n.language === 'en' ? 'english' : 'spanish', { refetchOnMountOrArgChange: true })
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[4].title }]

  const Item = ({ title, text }) => {
    return (
      <div className='flex flex-col gap-y-3'>
        <h4 className='!text-lg !font-archivo !normal-case'>{title}</h4>
        <p className='!text-base text-neutral-silver-200 !font-archivo !text-left'>{text}</p>
      </div>
    )
  }

  return (
    <>
      <div className='pt-4 pb-10 px-3 md:container md:pt-10 md:px-[120px] md:pb-[60px]'>
       <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
            <div className='container-items-account'>
                <h3 className='font-thunder-bold !text-5xl !font-bold'>{t('terms.title')}</h3>
                <h5 className='text-neutral-silver-200 !text-lg !font-archivo'>{t('terms.subtitle')}</h5>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl md:p-8 py-8 px-6 flex flex-col gap-y-6'>
            {terms.map((el) => (
              <Item title={el.title} text={el.text}/>
            ))}
        </div>
      </div>
    </>
  )
}

export default Terms