import { useRef, useState, useEffect } from 'react';
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from '@heroicons/react/24/outline';
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { motion } from 'framer-motion';
export default function Input({ type, placeholder, label, name, value, onChange, showHide, helper, required, register, error,
                                showClipboard, disabled, onlyNumeric, showDelete, showMore, onDelete, isOpen, toggleOpen }) {
                                  
  const [inputType, setInputType] = useState(type);
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null);
  useEffect(() => {
    if(onlyNumeric){
      const handleKeyPress = (evt) => {
        const valueLength = evt.target.value.length
        if (evt.key < '0' || evt.key > '9' || valueLength >= 4 ) {
          evt.preventDefault();
        }
      };
      const numericInput = inputRef.current;
      if (numericInput) {
        numericInput.addEventListener('keypress', handleKeyPress); // keypress para que chequee al presionar el boton, change lo agrega y después chequea
        return () => {
          numericInput.removeEventListener('keypress', handleKeyPress);
        };
      }
    }
  }, [onlyNumeric]);

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
            {helper && <span className='text-sm text-neutral-silver-300'>{helper}</span>}
            <motion.span
              className='text-sm text-error-red'
              key={error}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}>
              {error}
            </motion.span>
          </label>
        )}
        <div className='relative'>
          {register 
            ? (
              <input
              type={inputType}
              placeholder={placeholder}
              id={name}
              name={name}
              {...register(name, { required })}
              className={`transition duration-300 border border-neutral-silver-400 bg-neutral-silver-700 rounded-xl p-4 w-full focus:outline-none focus:border-brand-gold leading-5 ${error && '!border-error-red'}`} />
            )
            : (
              <input
              type={inputType}
              placeholder={placeholder}
              id={name}
              name={name}
              ref={inputRef}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={`border border-neutral-silver-400 bg-neutral-silver-700 rounded-xl p-4 w-full 
                          focus:outline-none focus:border-brand-gold leading-5 disabled:bg-neutral-silver-600 disabled:border-none 
                        disabled:text-neutral-silver-300 transition duration-300 ${error && 'border-error-red'}`}/>
            )
          }

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
         {showDelete &&
            <div className='absolute top-4 right-4'>
              <button type='button' onClick={onDelete}>
                  <XMarkIcon className="h-5 w-5 text-error-red" />
              </button>
            </div>
          }
          {showMore &&
            <div className='absolute top-4 right-4 '>
              <button type='button' onClick={toggleOpen}>
                {isOpen  ?
                  <ChevronUpIcon className='h-5 w-5 text-neutral-silver-200' /> :
                  <ChevronDownIcon className='h-5 w-5 text-neutral-silver-200' />
                }
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}