import React from 'react'
import { useTranslation } from 'react-i18next';
import GeneralRow from './GeneralRow'
import empty from 'assets/images/empty-chest.svg';

const GeneralList = ({data}) => {
  const { t } = useTranslation()
  return (
    <>
    <div className='flex flex-col md:gap-y-4 gap-y-3 '>
          {data.length > 0 ? data.map((el) => (
              <GeneralRow notification={el}/> 
          )) : 
          <div className='flex flex-col items-center gap-2'>
              <h4>{t('notification.nothing_here')}</h4>
              <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                {t('notification.not_general')}
              </p>
              <img src={empty} alt='' width={240} height={128} className='mb-5' />
          </div>
       }
      </div>
    </>  )
}

export default GeneralList