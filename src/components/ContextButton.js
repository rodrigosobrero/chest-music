import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from 'hooks/useOutsideClick';
import { classNames } from 'utils/helpers';

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';

import dots from 'assets/images/icon-dots-horizontal.svg';

export default function ContextButton({ options, onClick, action }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const Icon = ({ type }) => {
    let icon;

    switch (type) {
      case 'add':
        icon = <PlusIcon className='h-6 w-6' />
        break;
      case 'detail':
        icon = <EyeIcon className='h-6 w-6' />
        break;
      case 'share':
        icon = <ArrowUpTrayIcon className='h-6 w-6' />;
        break;
      case 'download':
        icon = <ArrowDownTrayIcon className='h-6 w-6' />;
        break;
      case 'edit':
        icon = <PencilSquareIcon className='h-6 w-6' />;
        break;
      case 'delete':
        icon = <TrashIcon className='h-6 w-6' />;
        break;
    }

    return icon;
  }

  const Button = ({ onClick, description, type }) => {
    return (
      <button
        type='button'
        className={classNames({
          'bg-neutral-silver-700 text-neutral-silver-200 p-2 rounded-lg primary': true,
          'alert': type === 'delete'
        })}
        onMouseEnter={() => { setDescription(description) }}
        onMouseLeave={() => { setDescription('') }}
        onClick={onClick}>
        <Icon type={type} />
      </button>
    )
  }

  const ref = useOutsideClick(handleClose);

  return (
    <>
      <div className='relative' ref={ref}>
        <button
          onClick={toggleOpen}
          className={classNames({
            'context-button': true,
            'bg-neutral-silver-700 border-neutral-silver-600': open
          })}>
          <img src={dots} alt='' width={24} height={24} className='min-w-[20px] min-h-[20px]' />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              className='context-button-container h-20 w-auto absolute'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>
              <div className='flex flex-col w-full gap-1.5'>
                <motion.div
                  className='text-sm font-light text-neutral-silver-100'
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  key={description}>
                  {description ? description : <span>&nbsp;</span>}
                </motion.div>
                <div className='flex flex-row gap-1'>
                  {options.map(option => (
                    <Button
                      onClick={() => { action(option.type) }}
                      key={option.type}
                      type={option.type}
                      description={option.description} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}