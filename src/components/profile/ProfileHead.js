import React, { useState } from 'react'
import ProgressBar from 'components/ProgressBar'
import cloud from 'assets/images/icon-cloud-upload.svg'
import pencil from 'assets/images/icon-pencil-alt.svg'
import { bytesToSize } from 'utils/helpers'
import Modal from 'components/Modal'
import ChangeDataModal from 'components/modals/ChangeDataModal'
import { useTranslation } from 'react-i18next'
import { patchData } from 'utils/api'
import { useDispatch } from 'react-redux'
import { updateUserData } from 'app/auth'
const ProfileHead = ({ data, token }) => {
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
      console.log(token)
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
        <Modal show={show} setShow={setShow}>
            <ChangeDataModal title={t('account.modals.change_name')}  toggle={toggle} onClick={changeName}
                            subtitle={t('account.modals.change_subtitle')} primaryButton={t('global.save')}
                            secondaryButton={t('global.cancel')} inputsData={inputData} handleChange={handleChange} isAvailable={input !== ''} />
        </Modal>
        <div className='flex w-full flex-col gap-y-3 md:flex-row md:justify-between md:items-center md:px-0 px-2'>
            <div className='flex items-center gap-x-4'>
                <h3 className='font-thunder-bold text-[64px] leading-[68px] md:text-[76px] font-bold'>{data.full_name}</h3>
                <button className='p-2 flex items-center' onClick={toggle}>
                    <img src={pencil} alt='' width={24} height={24} className='md:flex hidden' />
                </button>
            </div>
            <div className='flex justify-between flex-row-reverse md:flex-row items-center gap-x-4'>
                <div className='flex flex-col items-end'>
                    <span className='text-right text-neutral-silver-100 md:text-[14px] leading-[18px]'>
                      {bytesToSize(data.used_storage)}  
                      <span className='text-neutral-silver-300 leading-[18px] tracking-[0.14px]'> of </span> 
                      {bytesToSize(data.total_space)}  
                    </span>
                    <ProgressBar 
                    progress={100 * 242.3 / 1000} 
                    color='orange'
                    size='full'
                    direction='right'
                    background='gray' />
                </div>
                <div className='flex items-center flex-row-reverse md:flex-row md:gap-x-4 gap-x-3'>
                    <span className='text-brand-gold font-thunder font-normal leading-9	text-4xl tracking-[0.36px]'>
                        {Math.round(100 * data.used_storage / data.total_space)}%
                    </span>
                    <button className='p-2 bg-brand-gold rounded-[10px] cursor-pointer'>
                        <img src={cloud} alt='' width={28} height={28}  />
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileHead