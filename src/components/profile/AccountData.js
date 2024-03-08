import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Pencil } from 'assets/images/icon-pencil-alt.svg'
import Modal from 'components/Modal'
import ChangeDataModal from 'components/modals/ChangeDataModal'
import { patchData } from 'utils/api'
import { useDispatch } from 'react-redux'
import { updateUserData } from 'app/auth'

const AccountData = ({ data, token }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [show, setShow] = useState()
  const [ input, setInput ] = useState()
  const toggle = () => {
    setShow(!show)
    setInput('');
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const changeName = () => {
    if(input === '') return;
      patchData('account/', { full_name: input }, token)
      .then((response) => dispatch(updateUserData(response)))
      .catch((err) => console.log('error', err))
      .finally(() => { toggle();})
  }
  const inputData = [
    {
     label: t('account.artist_name'),
     placeholder: t('global.placeholder.write_here'),
     type: 'text'
    }]
  return (
    <> 
      <Modal show={show} setShow={setShow} >
        <ChangeDataModal title={t('account.modals.change_name')}  toggle={toggle} onClick={changeName}
                        subtitle={t('account.modals.change_subtitle')} primaryButton={t('global.save')}
                        secondaryButton={t('global.cancel')} inputsData={inputData} handleChange={handleChange} isAvailable={input !== ''} />
      </Modal>
      <div className='container-accountData !font-archivo'>
        <h4 className='text-[22px] !font-archivo !font-semibold !normal-case	'>{t('account.personal_data')}</h4>
        <div className='item'>
            <h5 className='text-neutral-silver-200  !text-base !font-archivo'>{t('account.artist_name')}</h5>
            <div className='flex gap-x-3 items-center' onClick={toggle}>
               <h5 className='text-lg !font-archivo'>{data?.full_name} </h5> <Pencil className='cursor-pointer h-5 w-5' />
            </div> 
        </div>
        <div>
            <h5 className='text-neutral-silver-200 !text-base !font-archivo'>{t('account.artist_username')}</h5>
            <h5 className='!text-lg !font-archivo'>@{data?.username}</h5>
        </div>
        <div >
            <h5 className='text-neutral-silver-200 !text-base !font-archivo'>Email</h5>
            <h5 className='!text-lg !font-archivo'>{data?.email}</h5>
        </div>
      </div>
    </>
  )
}

export default AccountData