import React from 'react';
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import TabButton from 'components/TabButton';
import { useTranslation } from 'react-i18next';

const OptionSectionMobile = ({ status, changeStatus }) => {

  const { t } = useTranslation()

  return (
    <div className="flex md:hidden max-w-[100vw]  justify-center space-x-2 overflow-x">
      <div className={` flex flex-col transition-[1000ms]
                  ${status === 'post' && '!-translate-x-[10px]'}
                  ${status === 'send' && '!-translate-x-[80px]'}
                  ${status === 'generate' && '!translate-x-[80px]'}`}>
          <button
            className={`share-button transition-[1000ms] !w-[200px] ${status === 'generate' && 'isActive'}`}
            onClick={() => changeStatus('generate')}>
            <LinkIcon className={`h-7 w-7 ${status === 'generate' ? 'text-neutral-black': 'text-neutral-silver-200'}`}/>
            <span>{t('share.generate_link') }</span> 
          </button>
          <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'generate' && 'hidden'}`}></div>
      </div>
      {/* <TabButton text='Generate Link' icon={'link'} isActive={true}/> */}
      <div className='flex flex-col'>
        <button
          className={`share-button transition-[1000ms]
            ${status === 'generate' && '!translate-x-[80px]'}
            ${status === 'post' && 'isActive scale-125 && isActive '}
            ${status === 'send' && '!-translate-x-[80px] '}
          `}
          onClick={() => changeStatus('post')}>
          {status === 'post' ? <IconTwitterAlt className="h-7 w-7"/> :  <IconTwitter className="h-7 w-7"/>}  {t('share.post')}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'post' && 'hidden'}`}></div>

      </div>
      <div className={`flex flex-col transition-[1000ms]
                  ${status === 'generate' && '!translate-x-[80px] transition-transform'}
                  ${status === 'post' && '!translate-x-[10px] transition-transform'}
                  ${status === 'send' && '!-translate-x-[80px] transition-transform'}`}>
        <button
          className={`share-button transition-[2000ms] ${status === 'send' && 'isActive'}`}
          onClick={() => changeStatus('send')}>
           {status === 'send' ? <IconSendAlt className="h-7 w-7"/> : <IconSend className="h-7 w-7"/> } {t('share.send')}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'send' && 'hidden'}`}></div>

      </div>
  </div>
  )
};

export default OptionSectionMobile