import React from 'react'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import FAQItem from 'components/profile/FaqItem'
import Breadcrumb from 'components/Breadcrumb'
import ContactUs from 'components/profile/ContactUs'

const Help = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  const { faqs } = t('help_center', { returnObjects: true});
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[4].title }]
  return (
    <>
      <div className='xl:px-[60px]'>
        <Breadcrumb className='px-3 xl:px-0' items={paths}/>
        <div className='container-head-account'>
          <div className='container-items-account'>
              <h4 className='font-thunder-bold text-5xl font-bold uppercase'>{items[4].title}</h4>
              <h5 className='text-neutral-silver-200 text-base xl:text-lg'>{t('help_center.subtitle')}</h5>
          </div>
        </div>
        <div className='w-full flex xl:flex-col gap-y-4 xl:gap-y-6 flex-col-reverse'>
          <ContactUs />
          <div className='px-4 py-4 pb-6 xl:p-8 bg-neutral-black rounded-3xl flex flex-col gap-y-4'>
              <div className='flex justify-between'>
                <h4>FAQs</h4>
                <SearchBar onChange={() => console.log('console')}/>
              </div>
              <div className='gap-y-4 flex flex-col '>
                {faqs.map((el, i) => (
                  <FAQItem question={el.title} answer={el.content} i={i} />
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Help