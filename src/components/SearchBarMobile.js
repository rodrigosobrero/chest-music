import React, { useState } from 'react'
import search from 'assets/images/icon-search-white.svg'
import close from 'assets/images/icon-close.svg'
import Input from './Input';
import SearchBar from './SearchBar';

const SearchBarMobile = ({ setIsOpen, isOpen, placeholder, onChange }) => {
//   const [ isOpen , setIsOpen ] = useState(false);
  return (
    <>
        {isOpen ? 
            <div className='w-full absolute bg-black transform duration-200 border-white flex gap-2'>
                <SearchBar placeholder={placeholder} onChange={onChange}/>
                <img src={close} onClick={() => setIsOpen(false)}/>
            </div>
            : 
            <button onClick={() => setIsOpen(!isOpen)}>
                <img src={search} />
            </button>
        }
    </>
  )
}

export default SearchBarMobile;