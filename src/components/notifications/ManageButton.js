import React, { useState } from 'react'
import Modal from '../Modal'
import { useTranslation } from 'react-i18next'
import Input from 'components/Input'
import Button from 'components/Button'
const ManageButton = ({ isOpen, filteredArtists, handleChange, selected, handleOptionSelect, input, handleDeleteSelected, createPermission }) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const toggle = () => setShow(!show);
  const textBlock = {
    title: t('manage.block_new_user'),
    subtitle: '<span>Search the desired user below to stop receiving their invites</span>',
    button: t('global.block')
  }
  const textAllow = {
    title: t('manage.allow_new_user'),
    subtitle: '<span>Search the desired user below to allow their invites</span>',
    button: t('global.allow')
  }
  const Dropdown = ({ handleOptionSelect, filteredArtists }) => {
    if(filteredArtists?.length > 0) {
        return (
          <div className="text-white md:w-full w-full md:pr-20 pr-12  h-full max-h-[50%]" style={{ position: 'absolute', zIndex: 999 }}>
            <ul className={`rounded-xl ${filteredArtists.length > 0 ? 'border' : 'border-none h-0'}
                          border-neutral-silver-500 max-h-48 md:max-h-[90%] overflow-auto bg-neutral-black mt-1`}
                          style={{ scrollbarWidth: 'none', scrollbarColor: '#000 #ccc' }}>
              {filteredArtists.map((option, index) => (
                <li key={option.username} onClick={() => handleOptionSelect(index)} 
                    className='py-3 px-4 text-base hover:bg-neutral-silver-600 
                              text-left border-b border-b-neutral-silver-600'>
                  {option.full_name}  
                </li>
              ))}
            </ul>
          </div>
        );
    } else return null
  };

  return (
    <>
       <button className='py-1.5'>
          <p className='text-brand-gold font-archivo text-base cursor-pointer' onClick={toggle}>+  {t('global.add_another')}</p>
       </button>
       <Modal show={show} setShow={setShow}>
         <div className='text-center'>
            <div className='px-4 gap-y-3 text-center'>
                <h3 className='uppercase text-center'>{isOpen ? textBlock.title : textAllow.title}</h3>
                <div className='text-lg text-neutral-silver-200' 
                      dangerouslySetInnerHTML={{__html: isOpen ? textBlock.subtitle : textAllow.subtitle}}/>
            </div>
            <div className='text-left mt-3'>
                   <Input key={`input-34}`} label={t('global.user')}
                          value={selected.full_name ? selected.full_name : input}
                          showDelete={(input !== '' || selected.hasOwnProperty('full_name') )}
                          placeholder={t('global.placeholder.search')}
                          disabled={selected.hasOwnProperty('full_name')} 
                          onDelete={handleDeleteSelected}
                          type={'text'} onChange={handleChange}/>
                  <Dropdown filteredArtists={filteredArtists} handleOptionSelect={handleOptionSelect}/>
            </div>
            <div className='gap-4 flex self-stretch	mt-10 text-lg'>
                <Button onClick={toggle} text={t('global.cancel')} style='tertiary' />
                <Button onClick={() => createPermission(toggle)} 
                        disabled={!selected.hasOwnProperty('full_name')} 
                        text={isOpen ? textBlock.button : textAllow.button}
                        style='primary'/>
            </div>
          </div>
       </Modal>
    </>
  )
}

export default ManageButton