import React from 'react';
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSnippet } from 'assets/images/icon-snippet.svg'
import TabButton from 'components/TabButton';
import { useTranslation } from 'react-i18next';

const OptionSectionMobile = ({ status, changeStatus }) => {

  const { t } = useTranslation()

  return (
    <div className="flex md:hidden overflow-x-auto w-[100vw]  justify-center space-x-2">
      <div className={` flex flex-col transition-[1000ms]
                  ${status === 'post' && '!translate-x-[170px]'}
                  ${status === 'snippet' && '!translate-x-[170px]'}
                  ${status === 'send' && '!translate-x-[170px]'}
                  ${status === 'generate' && '!translate-x-[170px]'}
                  `}
                  >
          <button
            className={`share-button transition-[1000ms] !w-[200px] ${status === 'generate' && 'isActive'}`}
            onClick={() => changeStatus('generate')}>
            <LinkIcon className={`h-7 w-7 ${status === 'generate' ? 'text-neutral-black': 'text-neutral-silver-200'}`}/>
            <span>{t('share.generate_link') }</span> 
          </button>
          <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'generate' && 'hidden'}`}></div>
      </div>
      {/* <TabButton text='Generate Link' icon={'link'} isActive={true}/> */}
      <div className={`flex flex-col transition-[1000ms]
                  ${status === 'generate' && '!translate-x-[170px] transition-transform'}
                  ${status === 'snippet' && '!translate-x-[170px] transition-transform'}
                  ${status === 'post' && '!translate-x-[170px] transition-transform'}
                  ${status === 'send' && '!translate-x-[170px] transition-transform'}`}>
        <button
          className={`share-button transition-[2000ms] ${status === 'snippet' && 'isActive'}`}
          onClick={() => changeStatus('snippet')}>
            <IconSnippet className="h-7 w-7" fill={`${status === 'snippet' ? 'black': '#C4C9CF'}`} /> {t('share.snippet')}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'snippet' && 'hidden'}`}></div>

      </div>
      {/* <div className='flex flex-col'>
        <button
          className={`share-button transition-[1000ms]
            ${status === 'generate' && '!translate-x-[170px]'}
            ${status === 'snippet' && '!translate-x-[170px] '}
            ${status === 'post' && '!translate-x-[170px] isActive scale-10 && isActive '}
            ${status === 'send' && '!translate-x-[170px] '}
          `}
          onClick={() => changeStatus('post')}>
          {status === 'post' ? <IconTwitterAlt className="h-7 w-7"/> :  <IconTwitter className="h-7 w-7"/>}  {t('share.post')}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'post' && 'hidden'}`}></div>

      </div> */}
      <div className={`flex flex-col transition-[1000ms]
                  ${status === 'generate' && '!translate-x-[170px] transition-transform'}
                  ${status === 'snippet' && '!translate-x-[170px] transition-transform'}
                  ${status === 'post' && '!translate-x-[170px] transition-transform '}
                  ${status === 'send' && '!translate-x-[170px] transition-transform'}`}>
        <button
          className={`share-button transition-[2000ms] ${status === 'post' && 'isActive'}`}
          onClick={() => changeStatus('post')}>
           {status === 'post' ? <IconTwitterAlt className="h-7 w-7"/> :  <IconTwitter className="h-7 w-7"/>} {t('share.post')}
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'post' && 'hidden'}`}></div>

      </div>
      <div className={`flex flex-col transition-[1000ms]
                  ${status === 'generate' && '!translate-x-[170px] transition-transform'}
                  ${status === 'snippet' && '!translate-x-[170px] transition-transform'}
                  ${status === 'post' && '!translate-x-[170px] transition-transform'}
                  ${status === 'send' && '!translate-x-[170px] transition-transform'}`}>
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