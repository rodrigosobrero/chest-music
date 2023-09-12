import React, { useState } from 'react'
import Modal from '../Modal'

const ManageButton = ({ isOpen }) => {
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show);
  const textBlock = {
    title: 'BLOCK NEW USER',
    subtitle: '<span>Search the desired user below to stop receiving their invites</span>',
    button: 'Block'
  }
  const textAllow = {
    title: 'ALLOW NEW USER',
    subtitle: '<span>Search the desired user below to allow their invites</span>',
    button: 'Allow'
  }
  const ModalContent = () => (
    <div>
        <div className='text-center'>
            <div className='px-4 gap-y-3'>
                <h3>{isOpen ? textBlock.title : textAllow.title}</h3>
                <div className='text-lg text-neutral-silver-200' 
                    dangerouslySetInnerHTML={{__html: isOpen ? textBlock.subtitle : textAllow.subtitle}}/>
            </div>
            <div className='text-left mt-3'>
                <label>User</label>
                <input type='search' placeholder='Search..' 
                className='border w-full rounded-xl border-neutral-silver-400 bg-neutral-silver-700 p-4 outline-none'/>
            </div>
            <div className='gap-4 flex self-stretch	mt-10'>
                <button onClick={toggle} className='px-6 py-3 w-full bg-neutral-silver-600 rounded-[10px]'>Cancel</button>
                <button onClick={toggle} className='px-6 py-3 w-full bg-neutral-silver-500 rounded-[10px]'>
                    {isOpen ? textBlock.button : textAllow.button}
                </button>
            </div>
        </div>
    </div>
  )
  return (
    <>
       <p className='text-brand-gold font-archivo text-base cursor-pointer' onClick={toggle}>+  Add another</p>
       <Modal show={show}>
           <ModalContent></ModalContent>
       </Modal>
    </>
  )
}

export default ManageButton