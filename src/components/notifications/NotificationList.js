import React, { useState } from 'react'
import NotificationRow from './NotificationRow'
import { useTranslation } from 'react-i18next'
import empty from 'assets/images/empty-chest.svg';

export const NotificationList = ({ invites, blockUser, replyNotification, unblockUser}) => {
  const { t } = useTranslation();

  return (
    <>

      <div className='flex flex-col md:gap-y-4 gap-y-3'>
          {invites?.length > 0 ? invites?.map((el) => (
              <NotificationRow invite={el} blockUser={blockUser} replyNotification={replyNotification} unblockUser={unblockUser} /> 
          )) :          
          <div className='flex flex-col items-center gap-2'>
              <h4 className='empty-title'>{t('notification.nothing_here')}</h4>
              <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                {t('notification.not_general')}
              </p>
              <img src={empty} alt='' width={240} height={128} className='mb-5' />
          </div>
        }
      </div>
    </>
  )
}
