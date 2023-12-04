import React from 'react'
import Input from '../Input'
import { useTranslation } from 'react-i18next';
import DropdownCountries from 'components/profile/DropdownCountries';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Button from 'components/Button';

const UpgradeStorage = ({ disabled, toggle, handleChange, isAvailable, onClick, countries, toggleList, isOpen, handleSelectOption , selected}) => {
  const { t } = useTranslation()
  return (
    <div className='md:w-[520px] text-center flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-3'>
          <h3 className='text-center'>{t('account.modals.upgrade_title')}</h3>
          <p className='text-lg text-neutral-silver-200'>{t('account.modals.upgrade_subtitle')}</p>
        </div>
        <div className='flex flex-col gap-y-4'>
          <Input label={t('account.modals.full_name')}  placeholder={t('global.placeholder.write_here')}
                  type={'text'} onChange={handleChange}/>
        </div>
        <div>

          {/* <Input label={t('account.modals.country_residence')}
                 placeholder={t('global.placeholder.select_one')} 
                 value={selected && selected.country}
                 type={'text'} showMore={true} onChange={handleChange} isOpen={isOpen} 
                 toggleOpen={toggleList} disabled/> */}
          <p className='!text-base text-left mb-1.5'>{t('account.modals.country_residence')}</p>
          <div className='border border-neutral-silver-400 bg-neutral-silver-700 rounded-xl p-4 w-full  text-neutral-silver-300
                           leading-5 disabled:bg-neutral-silver-600 disabled:border-none 
                        disabled:text-neutral-silver-300 flex justify-between items-center' onClick={toggleList}>
            <span>
             {selected ? <span className='text-white'> {selected.country }</span>: `${t('global.placeholder.select_one')}`}
            </span>
            <div className=''>
              <button type='button' onClick={toggleList}>
                {isOpen ?
                  <ChevronUpIcon className='h-5 w-5 text-neutral-silver-200' /> :
                  <ChevronDownIcon className='h-5 w-5 text-neutral-silver-200' />
                }
              </button>
            </div>
          </div>
          {isOpen && <DropdownCountries filteredOptions={countries} handleOptionSelect={handleSelectOption} />}
        </div>
        <div className='font-archivo font-semibold flex gap-4'>
          <Button text={t('global.cancel')} style={'third'} onClick={toggle}/>

          <Button text={t('global.send')} style={'primary'} disabled={disabled} onClick={onClick}/>
   
       </div>
    </div>
  )
}

export default UpgradeStorage