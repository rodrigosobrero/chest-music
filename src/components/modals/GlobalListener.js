import React from 'react'
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import Input from 'components/Input'
import DropdownSearch from 'components/profile/DropdownSearch'
import check from 'assets/images/icon-check-28.svg'
import Button from 'components/Button';
const GlobalListener = ({ handleChange, options = [], handleOptionSelect, listeners, 
                         toggle, onClick, selected, handleDeleteSelected, input, checked, handleCheck }) => {
  return (
    <>
        <div className='md:w-[520px] text-center flex flex-col  h-96'>
            <div className='flex gap-4 items-end'>
                <div className='w-full'>
                <DropdownSearch filteredOptions={options} handleOptionSelect={handleOptionSelect}>
                    <Input key={`input-34}`} label={'Global listener'}
                            placeholder={'Write user or email...'}  
                            disabled={selected.hasOwnProperty('full_name') ? true : false} 
                            showDelete={(input !== '' || selected.hasOwnProperty('full_name') ) && !checked}
                            onDelete={handleDeleteSelected}
                            value={selected.full_name ? selected.full_name : input}
                            type={'text'} onChange={handleChange}/>
                </DropdownSearch>
                </div>
                <button className='p-3 bg-brand-gold disabled:bg-neutral-silver-500  rounded-xl text-neutral-black disabled:text-neutral-silver-300'
                        disabled={!selected.hasOwnProperty('full_name')} onClick={handleCheck}>
                      <img src={check} className='h-7 w-7'/>
                </button>
            </div>
            <DropdownSearch filteredOptions={options} handleOptionSelect={handleOptionSelect}/>
            <div className='mt-6 flex flex-col gap-y-4 h-[70%] relative'>
                {listeners?.map((el, i) => (
                    <div className='flex gap-x-2 items-center'>
                        <div className='bg-neutral-black rounded-[40px] p-2'>
                        <MusicalNoteIcon className="h-5 w-5 text-neutral-silver-200" />
                        </div>
                        <span className='text-base'>{el.name}</span>
                    </div>
                ))}
            {selected?.hasOwnProperty('full_name') && checked &&
                <div className='flex gap-x-2 items-center'>
                        <div className='bg-neutral-black rounded-[40px] p-2'>
                        <MusicalNoteIcon className="h-5 w-5 text-neutral-silver-200" />
                        </div>
                        <span className='text-base'>{selected.full_name}</span>
            </div>
            }
            </div>
            <div className='font-archivo font-semibold flex gap-4'>
                <Button text={'Cancel'} style='tertiary' onClick={toggle} />
                <Button text={'Save'} disabled={!checked} style='primary' onClick={onClick}/>
            </div>
        </div>
     </>
  )
}

export default GlobalListener