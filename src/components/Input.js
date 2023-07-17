import { useState } from 'react';
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from '@heroicons/react/24/outline';

export default function Input({ type, placeholder, label, name, value, onChange, showHide }) {
  const [inputType, setInputType] = useState(type);

  const showHidePassword = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  return (
    <>
      <div className='flex flex-col gap-1.5 text-left'>
        <label htmlFor={name}>{label}</label>
        <div className='relative'>
          <input
            type={inputType}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className='border border-neutral-silver-400 bg-neutral-silver-700 rounded-xl p-4 w-full' />
          {showHide &&
            <div className='absolute top-5 right-5'>
              <button type='button' onClick={showHidePassword}>
                {inputType === 'password' ?
                  <EyeSlashIcon className='h-5 w-5 text-neutral-silver-500' /> :
                  <EyeIcon className='h-5 w-5 text-brand-gold' />
                }
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}