import React from 'react'
import { useTranslation } from 'react-i18next'
import AccountData from 'components/profile/AccountData'
import AccountPlan from 'components/profile/AccountPlan'
import Breadcrumb from 'components/Breadcrumb'
import Modal from 'components/Modal'
import DeleteModal from 'components/modals/DeleteModal'
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
            <DeleteModal title={t('account.modals.delete_account')} subtitle={t('account.modals.delete_subtitle')}
                         confirmText={t('account.modals.delete_confirm')} primaryButton={t('general.confirm')}
                         secondaryButton={t('general.cancel')} placeholder={t('general.placeholder.write_here')}
                         label={t('general.email')} type={'email'}/>
        {/* <div className='w-[32rem] p-8 text-center flex flex-col  gap-y-8'>
            <div className='flex flex-col gap-y-4'>
                <h3 className='text-[48px]'>{t('account.modals.delete_account')}</h3>
                <p className='text-neutral-silver-200 text-lg'>{t('account.modals.delete_subtitle')}</p>
                <p className='text-lg'>{t('account.modals.delete_confirm')}</p>
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
        </div> */}
        </Modal>
        <div>
            <Breadcrumb className='px-3 xl:px-0' items={paths}/>
            <div className='container-head-account'>
                <div className='container-items-account'>
                    <h4 className='font-thunder-bold text-5xl uppercase font-bold'>{items[2].title}</h4>
                    <h5 className='text-neutral-silver-200 text-base'>{t('account.subtitle')}</h5>
                </div>
            </div>
            <div className='w-full bg-neutral-black xl:p-8 p-3 flex flex-col xl:flex-row gap-y-3 gap-x-8 rounded-3xl'>
                <AccountData />
                <AccountPlan />
            </div>
        <button onClick={toggle} className='px-6 py-3 bg-neutral-silver-600 rounded-[10px] text-[#FF3636] mt-8'>Delete account</button>
        </div>
    </>
  )
}

export default Account