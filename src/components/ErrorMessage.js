import { AnimatePresence, motion } from 'framer-motion';

export default function ErrorMessage({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className='text-sm text-error-red'>
        {message}
        </motion.span>
      )}
    </AnimatePresence>
  )
}