import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { api } from 'utils/axios';
import { firstLetterUpperCase } from 'utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';

export default function AutoComplete({ options, handleAdd, filter }) {
  const inputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState(options[0]);
  const [focus, setFocus] = useState(false);

  const handleOnChange = (event) => {
    const lowerCase = event.target.value.toLowerCase();

    setSearchValue(lowerCase);
  }

  const handleOnClick = (value) => {
    setSearchValue(value.full_name);
    setSearchResult([]);
    setSelectedUser(value);
  }

  const handleClose = () => {
    setSearchValue('');
    setSearchResult([]);
    setSelectedUser('');
  }

  const getAccounts = async () => {
    try {
      const response = await api.get('/user', {
        headers: { Authorization: `Bearer ${user?.token}` },
        params: {
          search: searchValue
        }
      });

      let result;
      
      if (filter) {
        result = response.data.filter(user => user.type !== filter);
      } else {
        result = response.data;
      }

      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchValue.length === 2) {
      getAccounts();
    } else if (searchValue.length === 0) {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <>
      <div className='flex flex-row gap-4 mb-6'>
        <div className='relative w-full'>
          <div className='relative'>
            <div className='relative'>
              <input
                value={searchValue}
                type='search'
                ref={inputRef}
                onChange={handleOnChange}
                className='custom-input !pr-16 md:!pr-40'
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
                placeholder='Write user or email...' />
              <select
                className='custom-select absolute top-0 right-0 !w-auto !pr-12 !text-right !border-0 !bg-transparent'
                onChange={(e) => { setSelectedRole(e.target.value) }}>
                {options.map((option) =>
                  <option value={option} key={option}>{firstLetterUpperCase(option)}</option>)
                }
              </select>
            </div>
            <AnimatePresence>
              {(searchValue && focus) && (
                <motion.button
                  type='button'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='absolute top-0 bottom-0 right-32'
                  onClick={handleClose}>
                  <XMarkIcon className='h-5 w-5 text-error-red' />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {searchResult.length > 0 && (
              <motion.div
                className='autocomplete-container'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                {searchResult.map((item) => (
                  <div
                    className='autocomplete-item'
                    key={item.id}
                    onClick={() => { handleOnClick(item) }}>
                    <span>{item.full_name}</span>
                    <span className='text-sm text-neutral-silver-300'>{item.username}</span>
                  </div>
                ))}
                <div
                  className='autocomplete-item'
                  onClick={() => { inputRef.current.focus() }}>
                  <span className='text-neutral-silver-200 text-sm'>Can’t find that user? invite them via email!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          type='button'
          className='rounded-xl p-3 w-[54px] bg-brand-gold text-black disabled:text-neutral-silver-300 disabled:bg-neutral-silver-500 flex justify-center'
          disabled={!selectedUser}
          onClick={() => { handleAdd(selectedUser?.full_name, selectedRole, selectedUser?.id); setSearchValue(''); setSelectedUser(''); }}>
          <CheckIcon className='h-7 w-7' />
        </button>
      </div>
    </>
  )
}