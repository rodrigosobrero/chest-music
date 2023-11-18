import React, { useState } from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Input from 'components/Input'
import Toggle from '../Toggle'
import ButtonsContainer from '../ButtonsContainer';
import { useTranslation } from 'react-i18next';

const PostTwitter = ({ toggleUnlimited }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const submit = () => {
    const additionalUrl = 'https://web.chestmusic.com/track/0xlwJmalM7b'; // Reemplaza con la URL que desees añadir
    const tweetContent = `${input}\n\n${additionalUrl}`; // \n representa un salto de línea
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(tweetUrl, '_blank'); // Esto abre el enlace en una nueva pestaña
  }
  return (
    <>
      <div className='share-container'>
            <div className='md:flex md:flex-row flex-col items-center md:w-4/5 gap-5'>
                <div className='w-3/4'>
                <Input label={t('share.play_limit')} required={true} placeholder={t('global.placeholder.only_numbers')} />
                </div>
                <div className='w-1/4 flex items-center gap-2.5'>
                <Toggle onChange={toggleUnlimited}/>
                <span className='-mb-7'>{t('share.unlimited')}</span>
                </div>
            </div>
            <div className='flex flex-row gap-x-2.5 items-center md:w-4/5'>
                <input type='checkbox'/> 
                <label className='text-base font-archivo'>{t('share.allow_web_play')}</label>
                <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-silver-300" />
            </div>
            <div className='w-4/5'>
                <Input label={t('share.message')} placeholder={t('share.message_example')} onChange={(e) => setInput(e.target.value)}/>
            </div>
            <div className='w-4/5'>
                <Input label={'URL'} showClipboard={true} disabled={true} value={'https://web.chestmusic.com/track/0xlwJmalM7b'}/>
            </div>
       </div>
       <ButtonsContainer primaryButton={'Tweet'} disabled={input === ''} onClick={submit} />
     </>
  )
}

export default PostTwitter