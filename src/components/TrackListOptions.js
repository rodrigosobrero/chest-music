import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import dots from 'assets/images/icon-dots-horizontal.svg';
import eye from 'assets/images/icon-eye.svg';
import download from 'assets/images/icon-download.svg';
import plus from 'assets/images/icon-plus.svg';
import pencil from 'assets/images/icon-pencil.svg';
import trash from 'assets/images/icon-trash.svg';
import TrackListButton from 'components/TrackListButton';

export default function TrackListOptions() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
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
    if (!open) setDescription('');
    setOpen(!open);
    sequence();
  }

  return (
    <>
      <div className='relative'>
        <button
          type='button'
          className={`p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-700 ${open && 'bg-neutral-silver-700 border-neutral-silver-600'}`}
          onClick={toggleOpen}>
          <img src={dots} alt='' width={24} height={24} />
        </button>
        <motion.div 
          animate={animation} 
          initial={{ opacity: 0 }} 
          className='bg-neutral-silver-600 rounded-xl pt-2 px-1.5 pb-1.5 absolute bottom-12 right-0 h-0'>
          <motion.div
            className='h-full'
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: !open ? 0 : 1, width: '100%' }}
            transition={{ delay: 0.6 }}
            key={!open}>
            {
              open &&
              <>
                {
                  <motion.div
                    className='flex flex-col w-full absolute gap-1.5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <div className='text-sm font-light text-neutral-silver-100'>
                      {description}
                    </div>
                    <div className='flex flex-row gap-1'>
                      <TrackListButton icon={eye} onMouseEnter={() => { setDescription('View details') }} />
                      <TrackListButton icon={download} onMouseEnter={() => { setDescription('Download') }} />
                      <TrackListButton icon={plus} onMouseEnter={() => { setDescription('Add') }} />
                      <TrackListButton icon={pencil} onMouseEnter={() => { setDescription('Edit') }} />
                      <TrackListButton icon={trash} onMouseEnter={() => { setDescription('Delete') }} />
                    </div>
                  </motion.div>
                }
              </>
            }
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}