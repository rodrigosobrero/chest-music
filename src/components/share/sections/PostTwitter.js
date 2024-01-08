import React, { useState } from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import check from 'assets/images/icon-check-28.svg'
import Input from 'components/Input'
import Toggle from '../Toggle'
import ButtonsContainer from '../ButtonsContainer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PostTwitter = ({ onCancel, token, versionId }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [value, setValue] = useState('')
  const handleChange = (e) => setInput(e.target.value)

  const handleToggle = () => setIsToggled(!isToggled)

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

  const submit = () => {
    const additionalUrl = value;
    const tweetContent = `${input}\n\n${additionalUrl}`; 
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(tweetUrl, '_blank'); 
  }
  return (
    <>
      <div className='share-container'>
            <div className='md:flex md:flex-row flex-col items-center md:w-4/5 gap-5'>
                <div className='w-3/5'>
                  <Input label={t('share.play_limit')}
                         onChange={handleChange} 
                         required={true} 
                         placeholder={t('global.placeholder.only_numbers')} 
                         type="number"
                         disabled={isToggled}/>
                </div>
                <div className=' flex items-center  pb-5 mb-5 gap-2.5 md:pb-0 md:mb-0'>
                  <Toggle onChange={handleToggle}/>
                  <span className='-mb-7'>{t('share.unlimited')}</span>
                </div>
                <button className='-mb-7 p-3 bg-brand-gold disabled:bg-neutral-silver-500 rounded-xl 
                                   text-neutral-black disabled:text-neutral-silver-300'
                        onClick={generateLink}
                        disabled={!isToggled && !input}>
                      <img src={check} className='h-7 w-7'/>
                </button>
            </div>
            {/* <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                <input type='checkbox'/> 
                <label className='text-base font-archivo'>{t('share.allow_web_play')}</label>
                <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
            </div> */}
            <div className='w-4/5'>
                <Input label={t('share.message')} placeholder={t('share.message_example')} onChange={(e) => setInput(e.target.value)}/>
            </div>
            <div className='w-4/5'>
                <Input label={'URL'} showClipboard={true} disabled={true} value={value}/>
            </div>
       </div>
       <ButtonsContainer primaryButton={'Post'} disabled={value === ''} onClick={submit} onCancel={onCancel} />
     </>
  )
}

export default PostTwitter