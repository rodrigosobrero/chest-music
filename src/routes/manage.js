import React, { useEffect, useState } from 'react'
import ManageList from 'components/notifications/ManageList';
import Modal from 'components/Modal';
import ManageButton from 'components/notifications/ManageButton';
import unlocked from 'assets/images/icon-unlocked.svg';
import locked from 'assets/images/icon-lock.svg'
import Breadcrumb from 'components/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from 'app/auth';
import Loading from 'components/Loading';
import { useSearch } from 'hooks/useSearch';
import { useCreatePermissionMutation, useDeletePermissionMutation, useGetPermissionsQuery, useUpdatePermissionMutation } from 'store/api';

export default function Manage() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const [show, setShow] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const { data = [], isFetching, isLoading }= useGetPermissionsQuery()
  const [deletePermission] = useDeletePermissionMutation()
  const [createPermission] = useCreatePermissionMutation()
  const [updatePermission] = useUpdatePermissionMutation()
  const { filteredArtists, handleChange , handleOptionSelect, input, selected, handleDeleteSelected, reset} = useSearch(3, data, user?.token)

  const togglePermissions = async() => {
      const { data } = await updatePermission()
      dispatch(updateUserData(data))
      toggle()
  }

  const onCreatePermission = async (callback) => {
    const permission = user?.data.notifications_privacy === 'open' ? 'blocked' : 'allowed';
    await createPermission({permission: permission, user: selected.id})
    callback()
    reset()
  }

  const onDeletePermission = async (id) => {
    await deletePermission(id)
  }

  useEffect(() => {
    setIsOpen(user?.data.notifications_privacy === 'open')
  },[user?.data])


  const toggle = () => setShow(!show)
  const { t } = useTranslation() 

  const breadcrumbItems = [
    { name: t('global.notifications'), link: '/notifications' },
    { name: t('notification.manage'), link: '' },
  ];


  return (
    <>
      <Modal show={show} setShow={setShow}>
        <div className=' w-full md:max-w-[32rem]'>
          <div className='text-center'>
            <h3 className='text-center'>{isOpen ? t('global.close') : t('global.open')} {t('global.notifications')}</h3>
            <span className='text-base text-neutral-silver-200 mt-4'>
              {isOpen ? 'Are you sure you want to set privacy as closed? You’ll receive notifications from allowed users only.'
              : 'Are you sure you want to set privacy as open? You’ll receive notifications from anyone except blocked users.'}
              <br /> {t('global.learn_more')}
            </span>
          </div>
          <div className='font-archivo font-semibold flex gap-4 mt-4'>
            <button className='w-[48%] bg-neutral-silver-600 text-white h-10 rounded-lg' onClick={toggle}>{t('global.cancel')}</button>
            <button className='w-[48%] bg-brand-gold text-black h-10 rounded-lg'onClick={() => {  togglePermissions(); }}>
                {isOpen ? t('global.close') : t('global.open')}     
            </button>
          </div>
        </div>
      </Modal>

      <div className='flex  flex-col space-y-2 items-center  px-4 py-[32px] md:pb-[80px] md:pt-[40px] md:px-[120px] w-full'>
        <div className='w-full items-start'>
          <Breadcrumb className='px-0' items={breadcrumbItems}/>
        </div>
        <div className='md:hidden flex items-center justify-between h-20 bg-neutral-silver-600 p-3 w-full rounded-xl'>
           <div className='flex items-center gap-4 '>
               <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
               </div>
               <div className='flex flex-col'>
                    <span className='text-base font-semibold'>Privacy: {isOpen ? t('global.open') : t('global.cancel')}</span>
               </div>
           </div>
           <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
               {t('global.change')}                  
           </button>
        </div>
        <div className='bg-neutral-black h-28 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-6 md:px-20 '>
            <h3 className='uppercase text-[48px] font-bold tracking-[0.48px] leading-10	'>
                {isOpen ? t('manage.blocked_users') : t('manage.allowed_users')}
            </h3>
            <div className='p-2 hidden md:flex items-center bg-neutral-silver-600 rounded-xl space-x-4'>
                <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-base font-semibold'>{t('manage.privacy_set')} : {isOpen ? t('global.open') : t('global.close')}</span>
                    <span className='text-xs text-neutral-silver-200 font-normal'>
                      {isOpen ? t('manage.receive_any_except_blocked') : t('manage.receive_only_allowed')}
                    </span>
                </div>
                <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
                    {t('global.change')}                  
                </button>
            </div>
        </div>
        <div className='bg-neutral-black w-full flex flex-col items-center rounded-b-3xl rounded-t-md px-6 py-4 md:py-10 md:px-[60px]'>
             {isFetching ? <Loading /> : data.length > 0 && <ManageList data={data} privacyIsOpen={isOpen} onDelete={onDeletePermission}/>} 
             <ManageButton handleOptionSelect={handleOptionSelect} isOpen={isOpen} filteredArtists={filteredArtists} 
                           createPermission={onCreatePermission} handleDeleteSelected={handleDeleteSelected}
                           handleChange={handleChange} input={input} selected={selected} />
        </div>
      </div>
    </>
  )
}

