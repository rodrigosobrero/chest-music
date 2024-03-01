import React from 'react'
import { LinkIcon } from "@heroicons/react/24/solid";
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import TabButton from 'components/TabButton';
import { useTranslation } from 'react-i18next';
const OptionSectionDesktop = ({ status, changeStatus }) => {

  const { t } = useTranslation()

  return (
    <div className='md:max-w-xl hidden md:flex md:gap-1.5 md:px-0 px-6'>
        <TabButton text={t('share.generate_link')} isActive={status === 'generate'} 
                   icon='link'
                   onClick={() => changeStatus('generate')}/>
        <TabButton text={t('share.post')} isActive={status === 'post'} icon={'twitter'} 
                onClick={() => changeStatus('post')}/>
        <TabButton text={t('share.send_users')} isActive={status === 'send'} icon={'send'} 
                onClick={() => changeStatus('send')}/>
    </div>
  )
}

export default OptionSectionDesktop