import React from 'react'
import Input from '../Input'
import { useTranslation } from 'react-i18next';
import DropdownCountries from 'components/profile/DropdownCountries';
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
          <Input label={t('account.modals.country_residence')}
                 placeholder={t('global.placeholder.select_one')} 
                 value={selected && selected.country}
                 type={'text'} showMore={true} onChange={handleChange} isOpen={isOpen} 
                 toggleOpen={toggleList} />
          {isOpen && <DropdownCountries filteredOptions={countries} handleOptionSelect={handleSelectOption} />}
        </div>
        <div className='font-archivo font-semibold flex gap-4'>
          <button onClick={toggle} className='w-full bg-neutral-silver-600 text-white py-2.5 px-6 rounded-lg'>
           {t('global.cancel')}
          </button>
          <button onClick={onClick} className='w-full disabled:bg-neutral-silver-500 disabled:text-neutral-silver-300
           bg-brand-gold text-black py-2.5 px-6 rounded-lg' disabled={disabled}>
              {t('global.send')}
          </button>
       </div>
    </div>
  )
}

export default UpgradeStorage