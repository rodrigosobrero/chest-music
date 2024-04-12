import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from './Toast';
import { motion } from 'framer-motion';
import { removeFirst, removeByID } from 'app/toast';

const ToastProvider = ({ children }) => {
  const { toasts } = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  useEffect(() => {

    const intervalId = setInterval(() => {
      if(toasts.length > 0){
        dispatch(removeFirst())
      }
    }, 1000 * 5);

    return () => clearInterval(intervalId);

  }, [toasts, dispatch]);

  const onDelete = (id) => {
    dispatch(removeByID(id))
  };

  return (
    <>
      <div className='toast-container'>
        <div className='flex flex-col gap-3 items-end'>
        {
          toasts && toasts.map((toast) => (
            <motion.div
                    className='flex flex-col gap-3'
                    transition={{ duration: 0.7 }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 2 }}
                    exit={{ y: 100, opacity: 0, scale: 0.5 }}
                    >
              <Toast type={toast.type} title={toast.title} body={toast.body} close={() => onDelete(toast.id)} />
            </motion.div>
          ))
        }
        </div>
      </div>
      {children} 
    </>
  )
}

export default ToastProvider