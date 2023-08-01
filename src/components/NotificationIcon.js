import React from 'react'
import { MusicalNoteIcon, XMarkIcon, LinkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const NotificationIcon = ({ type, iconStyle, containerStyle }) => {
  console.log(type)
  const notificationIcons = {
    invite_accepted: LinkIcon,
    invite_denied: XMarkIcon,
    track_uploaded: CheckCircleIcon,
    track_shared: MusicalNoteIcon
    // Agrega más tipos de notificaciones y sus respectivos SVGs aquí
  };

  // Determinar el nombre del archivo SVG según el tipo de notificación
  const IconComponent = notificationIcons[type] || MusicalNoteIcon;


  return (
    <>
       <div className={containerStyle}>
          <IconComponent className={iconStyle} />
       </div>
    </>
  )
}

export default NotificationIcon