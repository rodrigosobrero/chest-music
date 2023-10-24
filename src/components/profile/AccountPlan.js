import React, { useState } from 'react'
import ProgressBar from 'components/ProgressBar'
import { useTranslation } from 'react-i18next'
import Modal from 'components/Modal'
import ChangeDataModal from 'components/modals/ChangeDataModal'
import { formatBytes } from 'utils/helpers'
const AccountPlan = ({ data }) => {
  const [ show, setShow ] = useState(false)
  const toggle = () => setShow(!show)
  const { t } = useTranslation()
  const inputData = [
   {
      label: t('account.modals.full_name'),
      placeholder: t('global.placeholder.write_here'),
      type: 'text'
   },
   {
      label: t('account.modals.full_name'),
      placeholder: t('global.placeholder.write_here'),
      type: 'text' 
   }
  ]
  return (
    <>
      <Modal show={show} >
        <ChangeDataModal title={t('account.modals.upgrade_title')}  toggle={toggle} 
                        subtitle={t('account.modals.upgrade_subtitle')} primaryButton={t('global.send')}
                        secondaryButton={t('global.cancel')} inputsData={inputData} />
      </Modal>
      <div className='container-accountPlan'>
         <h4 className='text-[22px] font-archivo font-semibold'>{t('account.my_plan')}</h4>
         <div className='flex gap-y-8 md:gap-x-14 flex-col md:flex-row'>
            <div className='space-y-4'>
               <h5 className='text-neutral-silver-200 text-base'>{t('account.storage')}</h5>
               <div className='flex gap-x-4'>
                    <span className='text-brand-uva text-4xl'>{Math.round((data?.used_storage / data?.total_space) * 100)}%</span>
                    <div className='flex flex-col items-start '>
                        <span className='text-left text-neutral-silver-100'>{formatBytes(data?.used_storage)} 
                            <span className='text-neutral-silver-300'> of </span> {formatBytes(data?.total_space)}
                        </span>
                        <ProgressBar 
                        progress={(data?.used_storage / data?.total_space) * 100} 
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
               <h5 className='text-neutral-silver-200 text-base'>{t('account.current_plan')}</h5>
               <div className='flex flex-col md:flex-row gap-4'>
                    <div className='md:w-3/5 '>
                        <h5 className='mb-1 text-xl !capitalize'>{data?.plan}</h5>
                        <span className='text-neutral-silver-300 text-sm'>
                            Amet pretium 1 GB scelerisque leo ut non lorem neque.
                        </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                          <span className='text-[1.75rem]'>0$   </span><span> / {t('global.month')}</span>
                    </div>
               </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default AccountPlan