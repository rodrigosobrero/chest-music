import React from 'react'
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import { LinkIcon } from "@heroicons/react/24/solid";

const TabIcon = ({ type, status }) => {
    console.log(type, status)
  const tabIcons = {
    twitter: IconTwitterAlt,
    send: IconSendAlt,
    link: IconSendAlt,
  }
  const IconComponent = tabIcons[type];
  return (
    <>
       <IconComponent />
    </>
  )
}

export default TabIcon