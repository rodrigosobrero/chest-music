import React from 'react'
import unlocked from 'assets/images/icon-unlocked.svg';
import ManageList from 'components/ManageList';
import manage from 'data/manage.json'
export default function Manage() {
  return (
    <>
      <div className='flex justify-center flex-col space-y-2 items-center h-full px-20'>
        <div className='bg-neutral-black h-24 w-full rounded-t-3xl rounded-b-md flex items-center justify-between px-20 '>
            <h3 className='uppercase'>BLOCKED USERS</h3>
            <div className='p-2 flex items-center bg-neutral-silver-600 rounded-xl space-x-4'>
              <div className='bg-neutral-black rounded-lg flex justify-center items-center h-10 w-10'>
                <img src={unlocked} className='h-4 w-4'/>
              </div>
              <div className='flex flex-col'>
                  <span className='text-base font-semibold'>Privacy is set to: Open</span>
                  <span className='text-xs text-neutral-silver-200 font-normal'>
                    Receive notifications from anyone except blocked
                  </span>
               </div>
               <button className='bg-neutral-silver-700 text-brand-gold capitalize px-2 text-sm rounded-xl'>
                  change
               </button>
            </div>
        </div>
        <div className='bg-neutral-black h-3/5 w-full rounded-b-3xl rounded-t-md px-20'>
             <ManageList data={manage}/> 
        </div>
      </div>
    </>
  )
}

