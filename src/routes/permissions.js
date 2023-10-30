import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PermissionsList from 'components/profile/PermissionsList'
import icon from 'assets/images/icon-exclamation-circle.svg'
import Breadcrumb from 'components/Breadcrumb'
import empty from 'assets/images/empty-chest.svg';
import { apiUrl } from 'utils/api'
import { useFetch } from 'hooks/useFetch'
import PermissionsButton from 'components/profile/PermissionButton'
import Modal from 'components/Modal'
import GlobalListener from 'components/modals/GlobalListener'
import { useSearch } from 'hooks/useSearch'
import axios from 'axios'
import spinner from 'assets/images/icon-loading-claim.png';
import { useSelector } from 'react-redux'
const Permissions = () => {
  const { t } = useTranslation() 
  const user = useSelector((state) => state.auth.user)
  const { data, handleToggle , isFetching } = useFetch(apiUrl + 'globalpermission/', user.token )
  const { handleChange, filteredArtists, handleOptionSelect, selected, handleDeleteSelected, input, checked, handleCheck, reset } = useSearch(3, data)
  const [ show, setShow ] = useState(false)
  const toggle = () => {setShow(!show); reset()}
  const addListener = () => {
    if(!selected.hasOwnProperty('full_name')) return;
    axios.post(apiUrl + 'globalpermission/', { user: selected.id }, { headers: {  Authorization: `Bearer ${user.token}`}, })
         .then((response) => { console.log(response.data); handleToggle(); toggle() })
  }
  const items = t('profile.sections', { returnObjects: true });
  let paths = [{ name:'Profile', link: '/profile' }, { name: items[1].title }]
  return (
    <>
      <div className='pt-4 pb-10 px-3 md:container md:pt-10 md:px-[120px] md:pb-[60px]'>
      <Breadcrumb className='px-3 md:px-0' items={paths}/>
        <div className='flex flex-col md:flex-row justify-between mt-5 mb-8 gap-y-6 px-1 md:px-0'>
                <div className='md:px-0 px-3 container-items-account'>
                    <h4 className='font-thunder-bold text-5xl font-bold uppercase'>{items[1].title}</h4>
                    <h5>{t('permissions.subtitle')}</h5>
                </div>
                <div className='flex items-center gap-3 p-3 max-w-md grow bg-neutral-black self-center rounded-xl '> 
                  <img src={icon} className='h-6 w-6' alt='exclamation circle'/>
                  <span className='text-neutral-silver-300 text-sm'>
                  {t('permissions.alert')}
                  </span>
                </div>
        </div>
        <div className='bg-neutral-black flex flex-col items-center w-full rounded-2xl md:rounded-3xl px-4 pt-3 pb-6 md:py-10 md:px-[60px]'>
                {isFetching ? 
                  <img src={spinner} alt='' width={20} height={20} className='animate-spin' /> : data.length >  0 ? <PermissionsList data={data} /> :            
                    <div className='flex flex-col items-center gap-2'>
                        <h4>{t('notification.nothing_here')}</h4>
                        <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                        {t('notification.not_general')}
                        </p>
                        <img src={empty} alt='' width={240} height={128} className='mb-5' />
                    </div> 
                }
                <PermissionsButton toggle={toggle} />
        </div>
      </div>
      <Modal show={show} setShow={setShow}>
          <GlobalListener handleChange={handleChange} options={filteredArtists} handleOptionSelect={handleOptionSelect} 
                          listeners={data} selected={selected} handleDeleteSelected={handleDeleteSelected} input={input}
                          checked={checked} handleCheck={handleCheck} toggle={toggle} onClick={addListener} />
       </Modal>
    </>
  )
}

export default Permissions