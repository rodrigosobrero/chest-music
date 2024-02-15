import React from 'react'
import { MusicalNoteIcon, XMarkIcon, LinkIcon, CheckCircleIcon, PlayIcon, PauseIcon  } from "@heroicons/react/24/solid";

const NotificationIcon = ({ type, iconStyle, containerStyle, isPlaying }) => {
  
  console.log('type', type)

  const notificationIcons = {
    invite_accepted: LinkIcon,
    invite_denied: XMarkIcon,
    track_uploaded: CheckCircleIcon,
    version_shared: MusicalNoteIcon,
    player: {
      play: PlayIcon,
      pause: PauseIcon
    }
  };
  const IconComponent = type === 'player' ? notificationIcons.player[isPlaying ? 'pause' : 'play'] : notificationIcons[type] || MusicalNoteIcon;
  return (
    <>
       <div className={containerStyle}>
          <IconComponent className={iconStyle} />
       </div>
    </>
  )
}

export default NotificationIcon