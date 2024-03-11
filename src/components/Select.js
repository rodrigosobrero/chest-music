import { useState, useRef, useEffect } from 'react';
import { classNames, firstLetterUpperCase } from 'utils/helpers';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';

export default function Select({ 
  disabled, 
  label, 
  minify,
  child,
  name, 
  onChange, 
  options, 
  position = 'bottom', 
  register, 
  required, 
  value }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [formattedOptions, setFormattedOptions] = useState(undefined);

  const handleSelect = (selectedValue) => {
    onChange({ target: { name, value: selectedValue } });
  }

  const toggleOpen = () => {
    if(disabled) return;
    setOpen(prev => !prev);
    inputRef.current.focus();
  }

  useEffect(() => {
    if (options && options.every(option => typeof option !== 'object')) {
      let list = [];

      options.map(option => {
        list.push({
          label: firstLetterUpperCase(option),
          value: option
        })
      });

      setFormattedOptions(list);
    } else {
      setFormattedOptions(options);
    }
  }, [options]);

  return (
    <>
      <div className='flex flex-col gap-1.5'>
        {label && <label>{label}</label>}
        {formattedOptions ? (
          <div className='relative'>
            <input
              type='text'
              placeholder='Select one...'
              className={classNames({
                'custom-select-input': !minify && !child,
                'custom-select-input-min': minify,
                'custom-select-input-child': child
              })}
              value={formattedOptions.find(option => option.value === value)?.label}
              ref={inputRef}
              onChange={onChange}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              {...(register && register(name, { required }))}
              disabled={disabled}
              readOnly />
            <div
              className='absolute right-4 top-[17px] cursor-pointer'
              onClick={toggleOpen}>
              <ChevronDownIcon className={classNames({
                'h-5 w-5 transition-all duration-300': true,
                'rotate-180': open,
                'text-white': !open,
                'text-brand-gold': open
              })} />
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  className={classNames({
                    'custom-select-options': true,
                    'top-[58px]': position === 'bottom',
                    'bottom-[58px]': position === 'top'
                  })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  {formattedOptions.map((option) => (
                    <button
                      type='button'
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      disabled={value === option.value}
                      className={classNames({
                        'dropdown-item': true,
                        'bg-neutral-silver-600': value === option.value,
                        'bg-black': value !== option.value
                      })}>
                      {value === option.value && (
                        <CheckIcon className='h-5 w-5 text-brand-gold' />
                      )}
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className='rounded-xl h-[54px] w-full lg:w-[100px] animate-pulse bg-neutral-silver-600'></div>
        )}
      </div>
    </>
  )
}