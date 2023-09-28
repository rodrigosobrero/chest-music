import React, { useState } from 'react'
import ManageList from 'components/notifications/ManageList';
import Modal from 'components/Modal';
import ManageButton from 'components/notifications/ManageButton';
import unlocked from 'assets/images/icon-unlocked.svg';
import locked from 'assets/images/icon-lock.svg'
import manage from 'data/manage.json'
import Breadcrumb from 'components/Breadcrumb';
import { useTranslation } from 'react-i18next';
export default function Manage() {
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState()
  const toggle = () => setShow(!show)
  const breadcrumbItems = [
    { name: 'Notifications', link: '/notification' },
    { name: 'Manage', link: '' },
  ];
  const { t } = useTranslation() 
  return (
    <>
      <Modal show={show}>
        <div className='max-w-[32rem] p-8 '>
          <div className='text-center'>
            <h3>{isOpen ? t('general.close') : t('general.open')} {t('general.notifications')}</h3>
            <span className='text-base text-neutral-silver-200 mt-4'>
              {isOpen ? 'Are you sure you want to set privacy as closed? You’ll receive notifications from allowed users only.'
              : 'Are you sure you want to set privacy as open? You’ll receive notifications from anyone except blocked users.'}
              <br /> {t('general.learn_more')}
            </span>
          </div>
          <div className='font-archivo font-semibold flex gap-4 mt-4'>
            <button className='w-[48%] bg-neutral-silver-600 text-white h-10 rounded-lg' onClick={toggle}>{t('general.cancel')}</button>
            <button className='w-[48%] bg-brand-gold text-black h-10 rounded-lg'onClick={() => {toggle(); setIsOpen(!isOpen);}}>
                {isOpen ? t('general.close') : t('general.open')}     
            </button>
          </div>
        </div>
      </Modal>

      <div className='flex justify-center flex-col space-y-2 items-center h-full px-4 py-[32px] xl:px-20'>
        <div className='w-full items-start'>
        <Breadcrumb className='px-0' items={paths}/>
        </div>
        <div className='xl:hidden flex items-center justify-between h-20 bg-neutral-silver-600 p-3 w-full rounded-xl'>
           <div className='flex items-center gap-4 '>
               <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
               </div>
               <div className='flex flex-col'>
                    <span className='text-base font-semibold'>Privacy: {isOpen ? t('general.open') : t('general.cancel')}</span>
               </div>
           </div>
           <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
               {t('general.change')}                  
           </button>
        </div>
        <div className='bg-neutral-black h-28 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-6 xl:px-20'>
            <h3 className='uppercase'>{isOpen ? t('manage.blocked_users') : t('manage.allowed_users') }</h3>
            <div className='p-2 hidden xl:flex items-center bg-neutral-silver-600 rounded-xl space-x-4'>
                <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-base font-semibold'>{t('manage.privacy_set')} : {isOpen ? t('general.open') : t('general.close')}</span>
                    <span className='text-xs text-neutral-silver-200 font-normal'>
                      {isOpen ? t('manage.receive_any_except_blocked') : t('manage.receive_only_allowed')}
                    </span>
                </div>
                <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
                    {t('general.change')}                  
                </button>
            </div>
        </div>
        <div className='bg-neutral-black w-full rounded-b-3xl rounded-t-md px-6 py-4 xl:py-10 xl:px-20'>
             <ManageList data={manage} privacyIsOpen={isOpen}/> 
             <ManageButton isOpen={isOpen} />
        </div>
      </div>
    </>
  )
}

