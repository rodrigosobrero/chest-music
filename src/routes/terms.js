import React from 'react'
import data from 'data/terms'
import Breadcrumb from 'components/Breadcrumb'
import { useTranslation } from 'react-i18next'
const Terms = () => {
  const { t } = useTranslation() 
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
        <Breadcrumb items={paths}/>
            <div>
                <h3 className='font-thunder-bold text-5xl font-bold'>Terms & conditions</h3>
                <h5 className='text-neutral-silver-200 text-lg'>Review user rights, legal responsibilities, and usage guidelines of the platform</h5>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl p-8 flex flex-col gap-y-6'>
            {data.map((el) => (
              <Item title={el.title} text={el.text}/>
            ))}
        </div>

      </div>
    </>
  )
}

export default Terms