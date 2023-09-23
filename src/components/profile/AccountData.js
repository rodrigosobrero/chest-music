import React from 'react'
import { useTranslation } from 'react-i18next'

const AccountData = ({  }) => {
  const data = { name: 'Agustin Posse', username: 'aposse', email: 'agustinposse1@gmail.com' }
  const { t } = useTranslation()
  return (
    <>
      <div className='bg-neutral-silver-700 xl:w-2/5 p-8 rounded-2xl space-y-6'>
        <h4 className='text-2xl font-archivo font-semibold'>{t('account.personal_data')}</h4>
        <div>
            <h5 className='text-neutral-silver-200'>{t('account.artist_name')}</h5>
            <h5>{data.name}</h5>
        </div>
        <div>
            <h5 className='text-neutral-silver-200'>{t('account.artist_username')}</h5>
            <h5>{data.username}</h5>
        </div>
        <div>
            <h5 className='text-neutral-silver-200'>Email</h5>
            <h5>{data.email}</h5>
        </div>
      </div>
    </>
  )
}

export default AccountData