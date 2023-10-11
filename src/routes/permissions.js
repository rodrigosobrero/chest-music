import React from 'react'
import { useTranslation } from 'react-i18next'
import permissions from 'data/permissions.json'
import PermissionsList from 'components/profile/PermissionsList'
import icon from 'assets/images/icon-exclamation-circle.svg'
import ManageButton from 'components/notifications/ManageButton'
import Breadcrumb from 'components/Breadcrumb'
const Permissions = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[1].title }]
  return (
    <>
      <div className='pt-4 pb-10 px-3 md:container md:pt-10 md:px-[120px] md:pb-[60px]'>
      <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='flex flex-col md:flex-row justify-between mt-5 mb-8 gap-y-6 px-1 md:px-0'>
                <div className='md:px-0 px-3 container-items-account'>
                    <h4 className='font-thunder-bold text-5xl font-bold uppercase'>{items[1].title}</h4>
                    <h5>{t('permissions.subtitle')}</h5>
                </div>
                <div className='flex items-center gap-3 p-3 max-w-md grow bg-neutral-black self-center rounded-xl '> 
                  <img src={icon} className='h-6 w-6'/>
                  <span className='text-neutral-silver-300 text-sm'>
                  {t('permissions.alert')}
                  </span>
                </div>
        </div>
        <div className='bg-neutral-black flex flex-col items-center w-full rounded-2xl md:rounded-3xl px-4 pt-3 pb-6 md:py-10 md:px-[60px]'>
                <PermissionsList data={permissions} /> 
                <ManageButton />
        </div>
      </div>
    </>
  )
}

export default Permissions