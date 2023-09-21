import React from 'react'
import { useTranslation } from 'react-i18next'
import AccountData from 'components/profile/AccountData'
import AccountPlan from 'components/profile/AccountPlan'
import Breadcrumb from 'components/Breadcrumb'
const Account = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[2].title }]
  return (
    <>
        <div className='xl:px-[60px]'>
            <Breadcrumb items={paths}/>
            <div className='flex mt-5 mb-8'>
                <div>
                    <h3 className='font-thunder-bold text-5xl font-bold'>Account</h3>
                    <h5 className='text-neutral-silver-200 text-lg'>Manage your personal information and current plan settings</h5>
                </div>
            </div>
            <div className='w-full bg-neutral-black xl:p-8 p-3 flex flex-col xl:flex-row gap-y-3 gap-x-8 rounded-[32px]'>
                <AccountData />
                <AccountPlan />
            </div>
        </div>
    </>
  )
}

export default Account