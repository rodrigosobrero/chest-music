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
      <div className='xl:px-[60px]'>
        <Breadcrumb items={paths} />
        <div className='flex flex-col xl:flex-row justify-between mt-5 mb-8 gap-y-6'>
                <div>
                    <h3 className='font-thunder-bold text-5xl font-bold'>{items[1].title}</h3>
                    <h5 className='text-neutral-silver-200 text-[16px] xl:text-lg'>{t('permissions.subtitle')}</h5>
                </div>
                <div className='p-3 bg-neutral-black w-[348px] rounded-xl flex items-center gap-3'> 
                  <img src={icon} className='h-6 w-6'/>
                  <span className='text-neutral-silver-300 text-sm'>
                  {t('permissions.alert')}
                  </span>
                </div>
        </div>
        <div className='bg-neutral-black w-full rounded-3xl px-6 py-4 xl:py-10 xl:px-20'>
                <PermissionsList data={permissions} /> 
                <ManageButton />
        </div>
      </div>
    </>
  )
}

export default Permissions