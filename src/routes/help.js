import React from 'react'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import FAQItem from 'components/profile/FaqItem'
import Breadcrumb from 'components/Breadcrumb'


const Help = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  const { faqs } = t('help_center', { returnObjects: true});
  console.log(faqs)
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[4].title }]
  return (
    <>
      <div className='xl:px-[60px]'>
        <div className='flex flex-col mt-5 mb-8 gap-y-6 xl:px-0 px-3'>
        <Breadcrumb items={paths}/>
        <div>
            <h3 className='font-thunder-bold text-5xl font-bold'>{items[4].title}</h3>
            <h5 className='text-neutral-silver-200 text-lg'>{t('help_center.subtitle')}</h5>
        </div>
        <div className='w-full bg-neutral-black p-8 rounded-3xl flex flex-col gap-y-6'>
            <h4>{t('help_center.contact_us')}</h4>
            <div className='flex w-full gap-x-6 flex-grow'>
                <div className='w-2/4'>
                   <Input type='email' label={t('help_center.email')} placeholder={t('general.placeholder.write_here')} />
                </div>
                <div className='w-2/4'>
                   <Input type='text' label={t('help_center.subject')} placeholder={t('general.placeholder.write_here')} />
                </div>
            </div>
            <div>
                <Input type='text' label={t('help_center.message')} placeholder={t('general.placeholder.write_here')} />
            </div>
            <div>

            <Button text={t('help_center.send')} type='primary' disabled={true}/>
            </div>
        </div>
        <div className='p-8 bg-neutral-black rounded-3xl flex flex-col gap-y-4'>
            <div className='flex justify-between'>
              <h4>FAQs</h4>
              <SearchBar onChange={() => console.log('console')}/>
            </div>
            <div className='gap-y-4 flex flex-col '>
              {faqs.map((el) => (
                <FAQItem question={el.title} answer={el.content} />
              ))}
            </div>
        </div>
        
       </div>
      </div>
    </>
  )
}

export default Help