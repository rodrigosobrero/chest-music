import React, { useState } from 'react'
import ManageList from 'components/notifications/ManageList';
import Modal from 'components/Modal';
import ManageButton from 'components/notifications/ManageButton';
import unlocked from 'assets/images/icon-unlocked.svg';
import locked from 'assets/images/icon-lock.svg'
import manage from 'data/manage.json'
import Breadcrumb from 'components/Breadcrumb';
export default function Manage() {
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState()
  const toggle = () => setShow(!show)
  const breadcrumbItems = [
    { name: 'Notifications', link: '/notification' },
    { name: 'Manage', link: '' },
  ];

  return (
    <>
      <Modal show={show}>
        <div className='max-w-[32rem] p-8 '>
          <div className='text-center'>
            <h3>{isOpen ? 'close' : 'open'} notifications</h3>
            <span className='text-base text-neutral-silver-200 mt-4'>
              {isOpen ? 'Are you sure you want to set privacy as closed? You’ll receive notifications from allowed users only.'
              : 'Are you sure you want to set privacy as open? You’ll receive notifications from anyone except blocked users.'}
              <br /> Learn more
            </span>
          </div>
          <div className='font-archivo font-semibold flex gap-4 mt-4'>
            <button className='w-[48%] bg-neutral-silver-600 text-white h-10 rounded-lg' onClick={toggle}>Cancel</button>
            <button className='w-[48%] bg-brand-gold text-black h-10 rounded-lg'onClick={() => {toggle(); setIsOpen(!isOpen);}}>
                {isOpen ? 'Close' : 'Open'}    
            </button>
          </div>
        </div>
      </Modal>

      <div className='flex justify-center flex-col space-y-2 items-center h-full px-4 py-[32px] xl:px-20'>
        <div className='w-full items-start'>
        <Breadcrumb items={breadcrumbItems}/>

        {/* <Ubication className='w-full items-start ' path={location.pathname}/> */}
        </div>
        <div className='xl:hidden flex items-center justify-between h-20 bg-neutral-silver-600 p-3 w-full rounded-xl'>
           <div className='flex items-center gap-4 '>
               <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
               </div>
               <div className='flex flex-col'>
                    <span className='text-base font-semibold'>Privacy: {isOpen ? 'Open' : 'Close'}</span>
               </div>
           </div>
           <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
               change                  
           </button>
        </div>
        <div className='bg-neutral-black h-28 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-6 xl:px-20'>
            <h3 className='uppercase'>{isOpen ? 'BLOCKED USERS' : 'ALLOWED USERS' }</h3>
            <div className='p-2 hidden xl:flex items-center bg-neutral-silver-600 rounded-xl space-x-4'>
                <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                    <img src={isOpen ?  unlocked : locked } className='h-4 w-4' alt='lock'/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-base font-semibold'>Privacy is set to: {isOpen ? 'Open' : 'Close'}</span>
                    <span className='text-xs text-neutral-silver-200 font-normal'>
                      {isOpen ? 'Receive notifications from anyone except blocked' : 'Receive notifications from allowed users only'}
                    </span>
                </div>
                <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl' onClick={toggle}>
                    change                  
                </button>
            </div>
        </div>
        <div className='bg-neutral-black w-full rounded-b-3xl rounded-t-md px-6 py-4 xl:py-10 xl:px-20'>
             <ManageList data={manage} privacyIsOpen={isOpen}/> 
             <ManageButton isOpen={isOpen} />
        </div>
      </div>
    </>
  )
}

