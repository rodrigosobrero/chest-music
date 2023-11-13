import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from './Input';

export default function AutoCompleteAlbum({ options, label, placeholder, helper, searchValue, setSearchValue }) {
  // const [searchValue, setSearchValue] = useState('');

  const handleOnChange = (event) => {
    const lowerCase = event.target.value.toLowerCase();
    setSearchValue(lowerCase);
  }

  const handleOnClick = (value) => {
    setSearchValue(value);
  }

  const handleClose = () => {
    setSearchValue('');
  }

  const filtered = options.filter(option => {
    if (searchValue) {
      return Object.values(option)
        .join(' ')
        .toLowerCase()
        .includes(searchValue)
    }
  });

  return (
    <>
      <div className='flex flex-row gap-4'>
        <div className='relative w-full'>
          <div className='relative flex flex-col gap-1.5 text-left'>
            <Input 
              type='search'
              label={label}
              value={searchValue}
              onChange={handleOnChange}
              className='custom-input !pr-10'
              helper={helper}
              placeholder={placeholder} />
            <AnimatePresence>
              {searchValue && (
                <motion.button
                  type='button'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='absolute top-7 bottom-0 right-4'
                  onClick={handleClose}>
                  <XMarkIcon className='h-5 w-5 text-error-red' />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {filtered.length > 0 && (
              <motion.div
                className='autocomplete-container'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                {filtered.map((item, index) => (
                  <div
                    className='autocomplete-item'
                    key={index}
                    onClick={() => { handleOnClick(item) }}>
                    <span>{item}</span>
                    <span className='text-sm text-neutral-silver-300'>{item.username}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}