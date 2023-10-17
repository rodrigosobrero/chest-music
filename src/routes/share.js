import React from 'react'
import track from 'data/track.json'
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import Button from 'components/share/Button';
import LinkGenerate from 'components/share/LinkGenerate';
import PostTwitter from 'components/share/PostTwitter';
import SendDM from 'components/share/SendDM';
const Share = () => {
  const [ status, setStatus ] = React.useState('generate');
  const [ isUnlimited, setIsUnlimited ] = React.useState(false)
  const [activeButton, setActiveButton] = React.useState(1);
  const toggleUnlimited = () => setIsUnlimited(!isUnlimited)

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  return (
    <>
      <div className='md:container md:p-[60px] md:rounded-3xl rounded-2xl bg-neutral-black my-10 md:gap-y-8 '>
        <div className='flex flex-col items-center md:gap-y-6 gap-y-4'>
           <h3 className='md:text-[64px] text-[48px] text-center'> SHARE YOUR TREASURE </h3>
           <img src={track.cover} alt='track cover' className='md:w-[200px] md:h-[200px] w-[140px] h-[140px]'/>
           <div className='text-center flex flex-col md:gap-y-2 gap-y-1.5'>
             <h4 className='md:text-[22px] text-base uppercase font-semibold'>{track.title}</h4>
             <h6 className='md:text-xl text-base text-neutral-silver-200'>{track.versions[0].version}</h6>
           </div>
          <div className='flex flex-col w-full md:items-center'>
            <div className='md:max-w-xl hidden md:flex md:gap-1.5 md:px-0 px-6'>
              <Button text={'Generate link'} isActive={status === 'generate'} icon={<LinkIcon className="h-7 w-7 text-neutral-black"/>} 
                      onClick={() => setStatus('generate')}/>
              <Button text={'Post'} isActive={status === 'post'} icon={<IconTwitter className="h-7 w-7"/>} 
                      onClick={() => setStatus('post')}/>
              <Button text={'Send to users'} isActive={status === 'send'} icon={<IconSend className="h-7 w-7"/>} 
                      onClick={() => setStatus('send')}/>
            </div>
            <div class="w-full p-4">
              <div class="gap-4 flex">
              <button
                className={`col-span-1 w-40 focus:outline-none transition-transform bg-neutral-silver-300 transform hover:scale-105 ${activeButton === 1 ? 'ml-0 !bg-brand-gold' : '-ml-10'}`}
                onClick={() => handleButtonClick(1)}>
                Botón 1
              </button>
              <button
                className={`col-span-1 w-40 focus:outline-none transition-transform bg-neutral-silver-300 transform hover:scale-105 ${activeButton === 2 ? 'ml-0 !bg-brand-gold' : '-ml-10'}`}
                onClick={() => handleButtonClick(2)}> 
              Botón 2
              </button>
              <button
                className={`col-span-1 w-40 focus:outline-none transition-transform bg-neutral-silver-300 transform hover:scale-105 ${activeButton === 3 ? 'ml-0 !bg-brand-gold' : '-ml-10'}`}
                onClick={() => handleButtonClick(3)}> 
              Botón 3
              </button>
              </div>
            </div>
            <div className='bg-neutral-silver-700 w-full md:w-[680px] md:px-8 md:py-12 gap-y-6 md:rounded-xl flex flex-col items-center'>
              {status === 'generate' && <LinkGenerate toggleUnlimited={toggleUnlimited} />}
              {status === 'post' && <PostTwitter toggleUnlimited={toggleUnlimited}/>}
              {status === 'send' && <SendDM toggleUnlimited={toggleUnlimited}/>}
            </div>
            <div className='md:w-4/5 flex md:gap-5 gap-4 md:mt-6 mt-3 font-semibold font-archivo text-xl'>
                <button className='px-6 py-3 w-full bg-neutral-silver-600 rounded-[10px]'>Cancel</button>  
                <button className='px-6 py-3 w-full bg-brand-gold rounded-[10px] text-neutral-black'>Send</button>           
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default Share