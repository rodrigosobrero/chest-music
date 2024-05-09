import React, { useState } from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import check from 'assets/images/icon-check-28.svg'
import Input from 'components/Input'
import Toggle from '../Toggle'
import ButtonsContainer from '../ButtonsContainer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createToast } from 'app/toast';
import useInput from '../hook/useInput';

const PostTwitter = ({ onCancel, token, versionId, track }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { handleToggle, handleChange, value, isChecked, 
          input, setValue, isToggled, handleMessage, message } = useInput();
  
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
  
  const generateToast = () => {

    let toastBody = {
      title: t('toasts.copy'),
      body: track,
      type: 'copy'
    };

    dispatch(createToast(toastBody));

  }
  
  const submit = () => {
    const additionalUrl = value;
    const tweetContent = `${message}\n\n${additionalUrl}`; 
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(tweetUrl, '_blank'); 
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
                <div className='flex items-center  pb-5 mb-5 gap-2.5 md:pb-0 md:mb-0'>
                  <Toggle onChange={handleToggle}/>
                  <span className='-mb-7'>{t('share.unlimited')}</span>
                </div>
                <button className='-mb-7 p-3 bg-brand-gold disabled:bg-neutral-silver-500 rounded-xl 
                                   text-neutral-black disabled:text-neutral-silver-300 lg:block hidden'
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
            <div className='lg:w-4/5 w-full'>
                <Input label={t('share.message')} placeholder={t('share.message_example')} onChange={handleMessage} />
            </div>
            <div className='lg:w-4/5 w-full'>
                <Input label={'URL'} showClipboard={true} disabled={true} value={value} showToast={generateToast} />
            </div>
       </div>
       <ButtonsContainer primaryButton={t('share.post')} disabled={value === ''} onClick={submit} onCancel={onCancel} />
     </>
  )
}

export default PostTwitter