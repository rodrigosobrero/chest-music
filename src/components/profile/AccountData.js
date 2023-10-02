import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Pencil } from 'assets/images/icon-pencil-alt.svg'
import Modal from 'components/Modal'
import ChangeDataModal from 'components/modals/ChangeDataModal'
const AccountData = ({  }) => {
  const data = { name: 'Agustin Posse', username: 'aposse', email: 'agustinposse1@gmail.com' }
  const { t } = useTranslation()
  const [show, setShow] = useState()
  const toggle = () => setShow(!show)
  const classDivs = 'flex flex-col gap-y-2'
  const inputData = [
    {label: t('account.artist_name'),
     placeholder: t('general.placeholder.write_here'),
     type: 'text'
    } ]
  return (
    <> 
      <Modal show={show} >
        <ChangeDataModal title={t('account.modals.change_name')}  toggle={toggle} 
                        subtitle={t('account.modals.change_subtitle')} primaryButton={t('general.save')}
                        secondaryButton={t('general.cancel')} inputsData={inputData} />
      </Modal>
      <div className='bg-neutral-silver-700 xl:w-2/5 py-8 px-6 xl:p-8 rounded-2xl space-y-6'>
        <h4 className='text-2xl font-archivo font-semibold'>{t('account.personal_data')}</h4>
        <div className={classDivs}>
            <h5 className='text-neutral-silver-200'>{t('account.artist_name')}</h5>
            <div className='flex gap-x-3'>
               <h5 className='text-lg'>{data.name} </h5> <Pencil className='cursor-pointer' onClick={toggle}/>
            </div> 
        </div>
        <div className={classDivs}>
            <h5 className='text-neutral-silver-200'>{t('account.artist_username')}</h5>
            <h5 className='text-lg'>{data.username}</h5>
        </div>
        <div className={classDivs}>
            <h5 className='text-neutral-silver-200'>Email</h5>
            <h5 className='text-lg'>{data.email}</h5>
        </div>
      </div>
    </>
  )
}

export default AccountData