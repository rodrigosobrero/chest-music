import { useState } from 'react';
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from '@heroicons/react/24/outline';
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";


export default function Input({ type, placeholder, label, name, value, onChange, showHide, helper, required, showClipboard, disabled }) {
  const [inputType, setInputType] = useState(type);
  const [copied, setCopied] = useState(false)
  const showHidePassword = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText('blabla')
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Error al copiar al portapapeles:', error);
      });
  };

  return (
    <>
      <div className='flex flex-col gap-1.5 text-left'>
        {label && (
          <label htmlFor={name} className='flex items-center'>
            <span className='grow'>{`${label}${required ? '*' : ''}`}</span>
            {helper && <span className=' text-sm text-neutral-silver-300'>{helper}</span>}
          </label>
        )}
        <div className='relative'>
          <input
            type={inputType}
            placeholder={placeholder}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className='border border-neutral-silver-400 bg-neutral-silver-700 rounded-xl p-4 
                       w-full focus:outline-none focus:border-brand-gold leading-5 disabled:bg-neutral-silver-600 disabled:border-none disabled:text-neutral-silver-300' />
          {showHide &&
            <div className='absolute top-4 right-4'>
              <button type='button' onClick={showHidePassword}>
                {inputType === 'password' ?
                  <EyeSlashIcon className='h-5 w-5 text-neutral-silver-500' /> :
                  <EyeIcon className='h-5 w-5 text-brand-gold' />
                }
              </button>
            </div>
          }
          {showClipboard &&
            <div className='absolute top-4 right-4'>
              <button type='button' onClick={copyToClipboard}>
                {!copied ? <DocumentDuplicateIcon className="h-5 w-5 text-neutral-silver-400" /> :
                  <DocumentDuplicateIcon className="h-5 w-5 text-brand-gold" />}
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}