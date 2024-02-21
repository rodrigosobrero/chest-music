import React from 'react'
import { ReactComponent as IconTwitterAlt } from 'assets/images/icon-x-alt.svg'
import { ReactComponent as IconSendAlt } from 'assets/images/icon-send-alt.svg'
import { ReactComponent as IconLink } from 'assets/images/icon-link.svg'

// import { LinkIcon } from "@heroicons/react/24/solid";

const TabIcon = ({ type }) => {
  const tabIcons = {
    twitter: IconTwitterAlt,
    send: IconSendAlt,
    link: IconLink,
  }
  const IconComponent = tabIcons[type];
  return (
    <>
       <IconComponent />
    </>
  )
}

export default TabIcon;