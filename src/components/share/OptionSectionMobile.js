import React from 'react';
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconInstagramBlack } from 'assets/images/icon-instagram-black.svg'
import { ReactComponent as IconInstagram } from 'assets/images/icon-instagram-alt.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-tiktok.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-tiktok-alt.svg'
import TabButton from 'components/TabButton';

const OptionSectionMobile = ({ status, changeStatus }) => {
  return (
    <div className="flex md:hidden max-w-[100vw]  justify-center space-x-2 overflow-x-hidden">
      {/* <div className={` flex flex-col transition-[1000ms]
                  ${status === 'story' && '!-translate-x-[10px]'}
                  ${status === 'reel' && '!-translate-x-[80px]'}
                  ${status === 'generate' && '!translate-x-[80px]'}`}>
          <button
            className={`share-button transition-[1000ms] !w-[200px] ${status === 'generate' && 'isActive'}`}
            onClick={() => changeStatus('generate')}>
            <LinkIcon className={`h-7 w-7 ${status === 'generate' ? 'text-neutral-black': 'text-neutral-silver-200'}`}/>
            <span>Generate link </span> 
          </button>
          <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'generate' && 'hidden'}`}></div>
      </div> */}
      <TabButton text='Generate Link' icon={'link'} isActive={true}/>
      {/* <div className='flex flex-col'>
        <button
          className={`share-button transition-[1000ms]
            ${status === 'generate' && '!translate-x-[80px]'}
            ${status === 'story' && 'isActive scale-125 && isActive '}
            ${status === 'reel' && '!-translate-x-[80px] '}
          `}
          onClick={() => changeStatus('story')}>
          {status === 'story' ? <IconInstagramBlack className="h-7 w-7"/> :  <IconInstagram className="h-7 w-7"/>}  Story
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'story' && 'hidden'}`}></div>

      </div>
      <div className={`flex flex-col transition-[1000ms]
                  ${status === 'generate' && '!translate-x-[80px] transition-transform'}
                  ${status === 'story' && '!translate-x-[10px] transition-transform'}
                  ${status === 'reel' && '!-translate-x-[80px] transition-transform'}`}>
        <button
          className={`share-button transition-[2000ms] ${status === 'reel' && 'isActive'}`}
          onClick={() => changeStatus('reel')}>
           {status === 'reel' ? <IconSendAlt className="h-7 w-7"/> : <IconSend className="h-7 w-7"/> } Tiktok
        </button>
        <div className={`w-[80px]  mx-auto h-0.5 mt-1.5 border border-brand-gold ${status !== 'reel' && 'hidden'}`}></div>

      </div> */}
  </div>
  )
};

export default OptionSectionMobile