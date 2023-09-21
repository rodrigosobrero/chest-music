import React, { useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion';
import webdisabled from 'assets/images/icon-webdisabled.svg'

const SharedToast = () => {
    const [open, setOpen] = useState(false);
    const animation = useAnimationControls();
  
    const sequence = async () => {
      if (open) {
        await animation.start({ height: 0 });
        await animation.start({ width: 0 });
        animation.start({ opacity: 0 });
      } else {
        await animation.start({ width: 228, opacity: 100 });
        animation.start({ height: 80 });
      }
    }
  
    const toggleOpen = () => {
      setOpen(prev => !prev);
      sequence();
    }

  return (
    <>
     <div className='relative '>
        <button
            type='button'
            className={`p-[7px] rounded-[10px] xl:flex hidden transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-700 ${open && 'bg-neutral-silver-700 border-neutral-silver-600'}`}
            onClick={toggleOpen}>
            <img src={webdisabled} alt='' width={24} height={24} />
        </button>
        {/* <motion.div 
            animate={animation} 
            initial={{ opacity: 0 }} 
            className='bg-neutral-silver-100 font-archivo text-neutral-black rounded-xl pt-2 px-1.5 pb-1.5 absolute bottom-12 -right-12 overflow-hidden' 
            onMouseLeave={toggleOpen}>
                <motion.div
                className='h-full '
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: open ? 1 : 0, width: '100%' }}
                transition={{ delay: 0.6 }}
                key={!open}>
                       Some listeners may record the track in their browser. You can play this track only
                       on the Chest App. 
                </motion.div>
        </motion.div> */}


     </div>
    </>
  )
}

export default SharedToast