import React from 'react'
import Breadcrumb from 'components/Breadcrumb'
import { useTranslation } from 'react-i18next'
const Terms = () => {
  const { t } = useTranslation() 
  const terms = t('terms.items', { returnObjects: true });
  console.log(terms)
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[4].title }]
  const Item = ({ title, text }) => {
    return (
      <div>
        <h4 className='text-xl font-archivo'>{title}</h4>
        <p className='text-base text-neutral-silver-200 text-left'>{text}</p>
      </div>
    )
  }
  return (
    <>
      <div className='xl:px-[60px]'>
        <div className='flex flex-col mt-5 mb-8 gap-y-6'>
        <Breadcrumb className='px-0' items={paths}/>
            <div>
                <h3 className='font-thunder-bold text-5xl font-bold'>{t('terms.title')}</h3>
                <h5 className='text-neutral-silver-200 text-lg'>{t('terms.subtitle')}</h5>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl p-8 flex flex-col gap-y-6'>
            {terms.map((el) => (
              <Item title={el.title} text={el.text}/>
            ))}
        </div>

      </div>
    </>
  )
}

export default Terms