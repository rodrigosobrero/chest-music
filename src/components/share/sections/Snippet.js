import React, { useState } from 'react'
import { ClockIcon, CloudIcon  } from "@heroicons/react/20/solid";
import ButtonsContainer from '../ButtonsContainer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';



const Snippet = ({ versionId, token, onCancel }) => {
    const { t } = useTranslation();
    const [isGenerating, setIsGenerating] = useState(false)
  
    const generateSnippet = () => {
      setIsGenerating(true)
      axios.get(`https://snippet-stg.chestmusic.com/shared/snippet?version_id=${versionId}`, {
        headers: { Authorization: `Bearer ${token}`  },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'video.mp4');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setIsGenerating(false)
      })    
      .catch((error) => {
        console.error(error);
      });
    }

  return (
    <>
    <div className='share-container'>
       <div className='py-4 flex flex-col gap-y-6'>
            <p className='text-base text-neutral-silver-200'>{t('share.snippet_desc')}</p>
            <div className='w-full items-center justify-center flex gap-5'>
            </div>
        </div>
        <Button style='primary' loading={isGenerating} text={t('share.generate_snippet')} onClick={generateSnippet}/>
    </div>
    <Button style='tertiary' customStyle='lg:!w-[224px] mt-6 !mx-auto !w-10/12' text={t('global.close')} onClick={onCancel} />
    </>
  )
}

export default Snippet