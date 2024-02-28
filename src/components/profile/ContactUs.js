import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button'
import Input from 'components/Input'
const ContactUs = () => {
  const { t } = useTranslation()
  return (
    <div className='w-full bg-neutral-black px-4 py-6 md:p-8 rounded-3xl flex flex-col gap-y-4 md:gap-y-6'>
      <h4 className='text-[28px] !normal-case !font-archivo'>{t('help_center.contact_us')}</h4>
      <div className='flex w-full gap-x-6 gap-y-4 flex-col md:flex-row'>
         <div className='md:w-2/4'>
            <Input type='email' label={t('help_center.email')} placeholder={t('global.placeholder.write_here')} />
         </div>
         <div className='md:w-2/4'>
            <Input type='text' label={t('help_center.subject')} placeholder={t('global.placeholder.write_here')} />
         </div>
      </div>
      <div>
        <Input type='text' label={t('help_center.message')} placeholder={t('global.placeholder.write_here')} />
      </div>
      <div className='mt-1 '>
        <Button text={t('help_center.send')} style='primary' disabled={true} customStyle={'md:!w-1/6 !w-auto'}/>
      </div>
     </div>
  )
}

export default ContactUs
