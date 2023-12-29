import React, { useState } from 'react'
import Toggle from 'components/share/Toggle';
import Input from 'components/Input';
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ButtonsContainer from '../ButtonsContainer';
import axios from 'axios';
import { apiUrl } from 'utils/api';
import { useTranslation } from 'react-i18next';
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
    axios.post(apiUrl + 'shared/link/' , data,  {
      headers: { Authorization: `Bearer ${token}`  }
    })
    .then((response) => {
      setValue(response.data.url)
    })
  }

  return (
    <> 
      <div className='share-container'>
              <div className='flex md:flex-row flex-col items-start md:items-center w-full md:w-4/5 gap-5'>
                  <div className='w-full md:w-3/4'>
                  <Input label={t('share.play_limit')}
                         onChange={handleChange} 
                         required={true} 
                         placeholder={t('global.placeholder.only_numbers')} 
                         type="number"/>
                  </div>
                  <div className='w-1/4 flex items-center  pb-5 mb-5 gap-2.5 md:pb-0 md:mb-0'>
                  <Toggle onChange={handleToggle}/>
                  <span className='-mb-7'>{t('share.unlimited')}</span>
                  </div>
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
      <ButtonsContainer primaryButton={'Generate'} onClick={generateLink} disabled={input === '' && !isToggled} onCancel={onCancel}/>
     </>
  )
}

export default LinkGenerate