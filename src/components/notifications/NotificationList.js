import React from 'react'
import NotificationRow from './NotificationRow'
import Modal from '../Modal'
export const NotificationList = ({ invites }) => {
  const [isOpen , setIsOpen] = React.useState(false)
  const ModalContent = () => {
    return (
      <div>
        <div className='px-10 text-center gap-y-3'>
          <h3>block user</h3>
          <span className='text-base text-neutral-silver-200'>Are you sure you want to block this user?</span>
          <div className='text-neutral-silver-200'>
            <span className='text-white'>Duki</span> @dukissj
          </div>
        </div>
        <div className='font-archivo font-semibold flex mt-8 gap-4'>
           <button className='w-[48%] bg-neutral-silver-600 text-white h-10 rounded-lg' onClick={() => setIsOpen(!isOpen)}>Cancel</button>
           <button className='w-[48%] bg-brand-gold text-black h-10 rounded-lg' onClick={() => setIsOpen(!isOpen)}>Block</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Modal show={isOpen}>
        <ModalContent />
      </Modal>
          {invites?.map((el) => (
              <NotificationRow invite={el} blockUser={() => setIsOpen(!isOpen)}/> 
          ))}
    </>
  )
}
