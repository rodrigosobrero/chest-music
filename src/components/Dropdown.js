import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, firstLetterUpperCase } from 'utils/helpers';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

export default function Dropdown({ list, selected, set, remove, disabled }) {
  const { t } = useTranslation();

  const [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(prev => !prev);
  }

  const handleClick = (item) => {
    set(item);
    toggleList();
  }

  return (
    <>
      <div className='relative'>
        <div>
          <button
            type='button'
            className='flex flex-row items-center gap-1 capitalize p-1'
            onClick={toggleList}
            disabled={disabled}>
            <span className={classNames({
              'text-sm md:text-base': true,
              'text-neutral-silver-400': disabled
            })}>
              {firstLetterUpperCase(selected)}
            </span>
            {listOpen
              ? <ChevronUpIcon className='h-5 w-5 text-white' />
              : <ChevronDownIcon className={classNames({
                'h-5 w-5 text-white': true,
                'hidden': disabled,
              })} />
            }
          </button>
        </div>
        <div className={`dropdown-list ${listOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
          {list.map((item, index) => (
            <button
              type='button'
              key={index}
              className={`dropdown-item ${selected === item ? 'bg-neutral-silver-600' : 'bg-black'}`}
              onClick={() => handleClick(item)}>
              {selected === item && (
                <CheckIcon className='h-5 w-5 text-brand-gold' />
              )}
              {item}
            </button>
          ))}
          <button
            type='button'
            className='dropdown-item !text-red-500 !border-t border-neutral-silver-500'
            onClick={remove}>
            {t('global.remove')}
          </button>
        </div>
      </div>
    </>
  )
}