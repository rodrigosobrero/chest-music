import React from 'react'
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'

import Button from './Button';
const OptionSectionDesktop = ({ status, changeStatus }) => {
  return (
    <div className='md:max-w-xl hidden md:flex md:gap-1.5 md:px-0 px-6'>
        <Button text={'Generate link'} isActive={status === 'generate'} 
                icon={<LinkIcon className={`h-7 w-7 ${status === 'generate' ? 'text-neutral-black' :'text-neutral-silver-200'}`}/>} 
                onClick={() => changeStatus('generate')}/>
        <Button text={'Post'} isActive={status === 'post'} icon={status === 'post' ? <IconTwitterAlt className="h-7 w-7"/> : <IconTwitter className="h-7 w-7"/>} 
                onClick={() => changeStatus('post')}/>
        <Button text={'Send to users'} isActive={status === 'send'} icon={status === 'send' ? <IconSendAlt className="h-7 w-7"/> : <IconSend className="h-7 w-7"/>} 
                onClick={() => changeStatus('send')}/>
    </div>
  )
}

export default OptionSectionDesktop