/**
 * @param {Boolean} show - Show/hide modal
 * @param {Object} children - Modal content
 */

import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children, show }) {
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
              transition={{ duration: 0.5 }}
            />
            <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                <motion.div
                  className='border-0 rounded-[20px] relative flex flex-col w-full bg-neutral-silver-700 outline-none focus:outline-none p-10'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, delay: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}>
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