import React, { useState } from 'react'
import ProgressBar from 'components/ProgressBar'
import { useTranslation } from 'react-i18next'
import Modal from 'components/Modal'
import ChangeDataModal from 'components/modals/ChangeDataModal'
const AccountPlan = ({  }) => {
  const [ show, setShow ] = useState(false)
  const toggle = () => setShow(!show)
  const storage = 1000
  const used = 242.2
  const { t } = useTranslation()
  const inputData = [
   {
      label: t('account.modals.full_name'),
      placeholder: t('general.placeholder.write_here'),
      type: 'text'
   },
   {
      label: t('account.modals.full_name'),
      placeholder: t('general.placeholder.write_here'),
      type: 'text' 
   }
  ]
  return (
    <>
      <Modal show={show} >
        <ChangeDataModal title={t('account.modals.upgrade_title')}  toggle={toggle} 
                        subtitle={t('account.modals.upgrade_subtitle')} primaryButton={t('general.send')}
                        secondaryButton={t('general.cancel')} inputsData={inputData} />
      </Modal>
      <div className='bg-neutral-silver-700 xl:w-3/5 py-8 px-6 xl:px-12 rounded-2xl space-y-6'>
         <h4 className='text-2xl font-archivo font-semibold'>{t('account.my_plan')}</h4>
         <div className='flex gap-y-8 xl:gap-x-14 flex-col xl:flex-row'>
            <div className='space-y-4'>
               <h5 className='text-neutral-silver-200'>{t('account.storage')}</h5>
               <div className='flex gap-x-4'>
                    <span className='text-brand-uva text-4xl'>{Math.round((used / storage) * 100)}%</span>
                    <div className='flex flex-col items-start '>
                        <span className='text-left text-neutral-silver-100'>{used} Mb 
                            <span className='text-neutral-silver-300'> of </span> {storage/1000}GB
                        </span>
                        <ProgressBar 
                        progress={100 * 242.3 / 1000} 
                        color='violet'
                        size='150'
                        direction='left'
                        background='gray' />
                    </div>
               </div>
               <button className='py-1.5' onClick={toggle}>
                  <h5 className='text-brand-gold font-archivo text-lg'>
                    {t('account.upgrade')}
                  </h5>
               </button>
            </div>
            <div className='space-y-4'>
               <h5 className='text-neutral-silver-200'>{t('account.current_plan')}</h5>
               <div className='flex flex-col xl:flex-row gap-4'>
                    <div className='xl:w-3/5 '>
                        <h5 className='mb-1'>{t('general.free')}</h5>
                        <span className='text-neutral-silver-300 text-sm'>
                            Amet pretium 1 GB scelerisque leo ut non lorem neque.
                        </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                          <span className='text-[1.75rem]'>0$   </span><span> / {t('general.month')}</span>
                    </div>
               </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default AccountPlan