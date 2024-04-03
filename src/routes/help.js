import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchBar from 'components/SearchBar'
import FAQItem from 'components/profile/FaqItem'
import Breadcrumb from 'components/Breadcrumb'
import ContactUs from 'components/profile/ContactUs'
import { useGetFaqsQuery } from 'store/api'
import SearchBarMobile from 'components/SearchBarMobile'
import { isDesktop } from 'react-device-detect';

const Help = () => {
  const { t, i18n } = useTranslation() 
  const { data: faqs = [] } = useGetFaqsQuery(i18n.language === 'en' ? 'english' : 'spanish', { refetchOnMountOrArgChange: true })
  const [ filteredData, setFilteredData ] = useState(faqs)
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name: t('global.profile'), link: '/profile' }, { name: items[4].title }]
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (e) => {
    setFilteredData(faqs.filter((el) => el.question.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(e.target.value.toLowerCase())))
  };
  
  return (
    <>
      <div className='pt-4 pb-10 px-3 container md:pt-10 md:px-[120px] md:pb-[60px]'>
        <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='container-head-account'>
          <div className='container-items-account'>
              <h4 className='font-thunder-bold text-5xl font-bold uppercase'>{items[4].title}</h4>
              <h5 className='text-neutral-silver-200 !text-base md:!text-lg !normal-case !font-archivo'>{t('help_center.subtitle')}</h5>
          </div>
        </div>
        <div className='w-full flex md:px-0 px-1 md:flex-col gap-y-4 md:gap-y-6 flex-col-reverse'>
          <ContactUs />
          <div className='px-4 py-4 pb-6 md:p-8 bg-neutral-black rounded-3xl flex flex-col gap-y-4'>
              <div className={`flex justify-between relative ${isOpen && 'pb-5 !px-0'} px-2`}>
                <h4 className='!font-archivo !normal-case text-[28px]'>FAQs</h4>
                {
                  isDesktop ? 
                  <SearchBar onChange={onChange} placeholder={t('global.placeholder.search')} />
                  :
                  <SearchBarMobile isOpen={isOpen} setIsOpen={setIsOpen} placeholder={t('global.placeholder.search')} onChange={onChange} />
                }
              </div>
              <div className='gap-y-4 flex flex-col '>
                {filteredData?.map((el, i) => (
                  <FAQItem question={el.question} answer={el.answer} i={i} />
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Help