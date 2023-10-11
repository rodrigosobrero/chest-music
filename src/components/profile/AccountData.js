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
  const classDivs = ''
  const inputData = [
    {label: t('account.artist_name'),
     placeholder: t('global.placeholder.write_here'),
     type: 'text'
    } ]
  return (
    <> 
      <Modal show={show} >
        <ChangeDataModal title={t('account.modals.change_name')}  toggle={toggle} 
                        subtitle={t('account.modals.change_subtitle')} primaryButton={t('global.save')}
                        secondaryButton={t('global.cancel')} inputsData={inputData} />
      </Modal>
      <div className='container-accountData'>
        <h4 className='text-[22px] font-archivo font-semibold'>{t('account.personal_data')}</h4>
        <div className='item'>
            <h5 className='text-neutral-silver-200  text-base'>{t('account.artist_name')}</h5>
            <div className='flex gap-x-3 items-center'>
               <h5 className='text-lg'>{data.name} </h5> <Pencil className='cursor-pointer h-4 w-4' onClick={toggle}/>
            </div> 
        </div>
        <div>
            <h5 className='text-neutral-silver-200 text-base'>{t('account.artist_username')}</h5>
            <h5 className='text-lg'>@{data.username}</h5>
        </div>
        <div >
            <h5 className='text-neutral-silver-200 text-base'>Email</h5>
            <h5 className='text-lg'>{data.email}</h5>
        </div>
      </div>
    </>
  )
}

export default AccountData