import React, { useState } from 'react'
import Toggle from 'components/share/Toggle';
import Input from 'components/Input';
import check from 'assets/images/icon-check-28.svg'
import ButtonsContainer from '../ButtonsContainer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
const LinkGenerate = ({ versionId, token, onCancel }) => {
  const { t } = useTranslation()
  const [input, setInput] =  useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [value, setValue] = useState('')

  const handleCheck = (e) => setIsChecked(e.target.checked)

  const handleToggle = () => setIsToggled(!isToggled)

  const handleChange = (e) => setInput(e.target.value)

  const generateLink = () => {
    let data = {};
    if(!isToggled) {
       data = {
        "version": versionId,
        "allow_web_play": isChecked,
        "play_limit": parseInt(input)       
      }
    }
    else {
      data = {
        "allow_web_play": isChecked,
        "version": versionId,
      }
    }
    axios.post(process.env.REACT_APP_API + 'shared/link/' , data,  {
      headers: { Authorization: `Bearer ${token}`  }
    })
    .then((response) => {
      setValue(response.data.url)
    })
  }

  return (
    <> 
      <div className='share-container'>
              <div className='flex md:flex-row flex-col items-start md:items-center w-full md:w-4/5 gap-6'>
                <div className='lg:w-3/5 flex items-end w-full justify-between gap-5 '>
                  <div className='w-full'>
                    <Input label={t('share.play_limit')}
                          onChange={handleChange} 
                          required={true} 
                          placeholder={t('global.placeholder.only_numbers')} 
                          type="number"
                          disabled={isToggled}/>
                  </div>
                  <button className='p-3 bg-brand-gold disabled:bg-neutral-silver-500 rounded-xl 
                                   text-neutral-black disabled:text-neutral-silver-300 md:hidden'
                          onClick={generateLink}
                          disabled={!isToggled && !input}>
                      <img src={check} className='h-7 w-7'/>
                  </button>  
                </div>
                  <div className=' flex items-center  pb-5 mb-5 gap-2.5 md:pb-0 md:mb-0'>
                  <Toggle onChange={handleToggle}/>
                  <span className='-mb-7'>{t('share.unlimited')}</span>
                  </div>
                  <button className='-mb-7 p-3 bg-brand-gold disabled:bg-neutral-silver-500 rounded-xl 
                                   text-neutral-black disabled:text-neutral-silver-300 hidden lg:block'
                          onClick={generateLink}
                          disabled={!isToggled && !input}>
                      <img src={check} className='h-7 w-7'/>
                </button>
              </div>
              {/* <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                  <input type='checkbox' onChange={handleCheck}/> 
                  <label className='text-base font-archivo'>{t('share.allow_web_play')}</label>
                  <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
              </div> */}
              <div className='w-full md:w-4/5'>
                  <Input label={'URL'} showClipboard={true} disabled={true} value={value}/>
              </div>
      </div>
      <Button style='tertiary' customStyle='lg:!w-[224px] mt-6 !mx-auto !w-10/12' text='Close' onClick={onCancel}/>
     </>
  )
}

export default LinkGenerate