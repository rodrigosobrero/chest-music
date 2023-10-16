import React from 'react'
import track from 'data/track.json'
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import Button from 'components//share/Button';
import Input from 'components/Input';
const Share = () => {
  return (
    <>
      <div className='md:container md:p-[60px] md:rounded-3xl rounded-2xl bg-neutral-black my-10 md:gap-y-8 '>
        <div className='flex flex-col items-center md:gap-y-6 gap-y-4'>
           <h3 className='md:text-[64px] text-[48px] text-center'> SHARE YOUR TREASURE </h3>
           <img src={track.cover} className='md:w-[200px] md:h-[200px] w-[140px] h-[140px]'/>
           <div className='text-center flex flex-col md:gap-y-2 gap-y-1.5'>
             <h4 className='md:text-[22px] text-base uppercase font-semibold'>{track.title}</h4>
             <h6 className='md:text-xl text-base text-neutral-silver-200'>{track.versions[0].version}</h6>
           </div>
           <div className='flex flex-col items-center'>
            <div className='flex md:gap-1.5'>
              <Button text={'Generate link'} isActive={true} icon={<LinkIcon className="h-7 w-7 text-neutral-black" />}/>
              <Button text={'Post'} isActive={false} icon={<IconTwitter className="h-7 w-7 text-neutral-black" />}/>
              <Button text={'Send to users'} isActive={false} icon={<IconSend className="h-7 w-7 text-neutral-black" />}/>
            </div>
            <div className='bg-neutral-silver-700 md:w-[680px] md:px-8 md:py-12 gap-y-6 md:rounded-xl flex flex-col items-center'>
              <div className='flex md:flex-row flex-col items-center md:w-4/5'>
                <div className='w-3/4'>
                  <Input label='Play limit' required={true} />
                </div>
                <div className='w-1/4'>
                  toggle
                </div>
              </div>
              <div className='flex flex-row gap-x-2.5 md:w-4/5'>
                <input type='checkbox'/> 
                <label className='text-base font-archivo'>Allow web play</label>
              </div>
              <div className='w-4/5'>
                <Input label={'URL'} />
              </div>
            </div>
           </div>
        </div>
      </div>
    </>
    )
}

export default Share