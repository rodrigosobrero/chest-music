/**
 * @param {Boolean} show - Show/hide modal
 * @param {Object} children - Modal content
 */

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ children, show, setShow }) {
  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShow(false);
      }
    }
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.addEventListener('keydown', keyDownHandler);
    }
  }, []);
  return (
    <>
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              className='fixed z-40 w-screen h-screen inset-0 bg-black bg-opacity-70'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className='flex justify-center items-end md:items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-full md:w-auto md:my-6 mx-auto md:max-w-3xl'>
                <motion.div
                  className='border-0 rounded-t-[20px] md:rounded-[20px] relative flex flex-col w-full bg-neutral-silver-700 outline-none focus:outline-none p-6 md:p-10'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}>
                  <div className='flex md:hidden md:invisible justify-end mb-2'>
                    <button type='button' className='p-1.5' onClick={() => { setShow(false) }}>
                      <XMarkIcon className='h-6 w-6 text-white' />
                    </button>
                  </div>
                  {children}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}