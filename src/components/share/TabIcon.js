import React from 'react'
import { ReactComponent as IconTwitter } from 'assets/images/icon-x.svg'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSend } from 'assets/images/icon-send.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import { LinkIcon } from "@heroicons/react/24/solid";

const TabIcon = ({ type, status }) => {
    console.log(type, status)
  const tabIcons = {
    twitter: {
        actived: IconTwitterAlt,
        disabled: IconTwitter
    },
    send: {
        actived: IconSendAlt,
        disabled: IconSend
    },
    link: {
        actived: IconSendAlt,
        disabled: IconSend
    }
  }
  const IconComponent = tabIcons[type][status];
  return (
    <>
        <IconComponent />
    </>
  )
}

export default TabIcon