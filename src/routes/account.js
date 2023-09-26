import React from 'react'
import { useTranslation } from 'react-i18next'
import AccountData from 'components/profile/AccountData'
import AccountPlan from 'components/profile/AccountPlan'
import Breadcrumb from 'components/Breadcrumb'
import Modal from 'components/Modal'
import Input from 'components/Input'
const Account = () => {
  const { t } = useTranslation() 
  const [show, setShow] = React.useState(false)
  const toggle = () => {
    setShow(!show)
  }
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[2].title }]
  return (
    <>
        <Modal show={show}>
        <div className='w-[32rem] text-center flex flex-col  gap-y-8'>
            <div className='flex flex-col gap-y-4'>
            <h3>{t('account.modals.delete_account')}</h3>
            <p className='text-neutral-silver-200 text-lg'>{t('account.modals.delete_subtitle')}</p>
            <p>{t('account.modals.delete_confirm')}</p>
            </div>
            <Input placeholder={t('general.placeholder.write_here')}/>
            <div className='font-archivo font-semibold flex gap-4'>
            <button onClick={toggle} className='w-full bg-neutral-silver-600 text-white py-2.5 px-6 rounded-lg'>
            {t('general.cancel')}
                </button>
            <button onClick={toggle} className='w-full bg-brand-gold text-black py-2.5 px-6 rounded-lg'>
                {t('general.confirm')}
                </button>
            </div>
        </div>
        </Modal>
        <div className='xl:px-[60px]'>
            <Breadcrumb items={paths}/>
            <div className='flex mt-5 mb-8'>
                <div>
                    <h3 className='font-thunder-bold text-5xl font-bold'>{items[2].title}</h3>
                    <h5 className='text-neutral-silver-200 text-lg'>{t('account.subtitle')}</h5>
                </div>
            </div>
            <div className='w-full bg-neutral-black xl:p-8 p-3 flex flex-col xl:flex-row gap-y-3 gap-x-8 rounded-[32px]'>
                <AccountData />
                <AccountPlan />
            </div>
        <button onClick={toggle} className='px-6 py-3 bg-neutral-silver-600 rounded-[10px] text-[#FF3636] mt-8'>Delete account</button>
        </div>
    </>
  )
}

export default Account