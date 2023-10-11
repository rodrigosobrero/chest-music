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
                         confirmText={t('account.modals.delete_confirm')} primaryButton={t('global.confirm')}
                         secondaryButton={t('global.cancel')} placeholder={t('global.placeholder.write_here')}
                         label={t('global.email')} type={'email'} toggle={toggle}/>
        </Modal>
        <div className='px-3 pt-4 pb-10 md:container md:px-[120px] md:pb-[60px] md:pt-[40px]'>
            <Breadcrumb className='px-3 md:px-0' items={paths}/>
            <div className='container-head-account'>
                <div className='container-items-account'>
                    <h4 className='font-thunder-bold text-5xl uppercase font-bold'>{items[2].title}</h4>
                    <h5>{t('account.subtitle')}</h5>
                </div>
            </div>
            <div className='w-full bg-neutral-black md:p-8 p-3 flex flex-col md:flex-row gap-y-3 gap-x-8 rounded-3xl'>
                <AccountData />
                <AccountPlan />
            </div>
            <div className='w-full flex justify-center md:justify-start items-center'>
                <button onClick={toggle} className='px-6 py-3  bg-neutral-silver-600 rounded-[10px] text-[#FF3636] mt-8'>Delete account</button>
            </div>
        </div>
    </>
  )
}

export default Account