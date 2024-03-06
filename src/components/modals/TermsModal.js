import Button from 'components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGetTermsQuery } from 'store/api'

const TermsModal = ({toggle}) => {
  const { t, i18n } = useTranslation() 
  const { data: terms = [] } = useGetTermsQuery(i18n.language === 'en' ? 'english' : 'spanish', { refetchOnMountOrArgChange: true })
  const capitalizeText = (text) => {
    return text.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join(' ')
  }
  return (
    <div className='h-[40rem]  flex flex-col gap-y-8 '>
        <div className='flex flex-col items-center gap-3'>
            <h4 className='!font-archivo text-[28px] !capitalize'>{t('terms.title')}</h4>
        </div>
        <div className='h-[32rem] flex flex-col gap-y-4 scrollbar scrollbar-track-trasparent  
         scrollbar-thumb-neutral-silver-400 overflow-y-auto px-2'>
            {terms?.map(({title, text}) => (
                <div className='flex flex-col gap-y-3'>
                     <h4 className='!text-lg !font-archivo !normal-case'>{capitalizeText(title)}</h4>
                     <p className='!text-base text-neutral-silver-200 !font-archivo !text-left'>{text}</p>
                </div>
            ))}
        </div>
        <div className='flex gap-6'>
            <Button style='tertiary' text={t('global.deny')} onClick={toggle}/>
            <Button style='primary' text={t('global.accept')} onClick={toggle}/>
        </div>
    </div>
  )
}

export default TermsModal