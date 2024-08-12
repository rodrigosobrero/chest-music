import Input from 'components/Input';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { auth } from 'utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PasswordReset() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [emailSent,setEmailSent] = useState(false)
  const [emailSentTo,setEmailSentTo] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors }
    } = useForm();


  const handleReset = (data) => {
    setEmailSentTo(data.email)
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setEmailSent(true)
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        {!emailSent? 
        <>
        <h1 className=' text-[76px]'>{t('global.password_reset.title')}</h1>
        <p className='text-neutral-silver-200 mb-6'>{t('global.password_reset.subtitle')}<br /> {t('global.password_reset.title')}</p>
        <div className='max-w-[480px] w-full'>
          <form onSubmit={handleSubmit(handleReset)} className='w-full'>
            <div className='flex flex-col gap-6 w-full'>
              <Input
                type='email'
                label='Email'
                name='email'
                register={register}
                required={true}
                error={errors.email && t('global.required')}
                placeholder={t('global.write_here')} />
              <Button type='submit' style='primary' text={t('global.password_reset.send')} disabled={errors.email} />
              <Button type='button' customStyle='text-brand-gold font-bold' text={t('global.cancel')} onClick={() => { navigate('/sign-in') }} />
            </div>
          </form>
        </div>
        </>
        :
        <>
        <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex flex-col gap-4 px-4 items-center justify-center w-full h-full'>
                <h1 className='text-[76px] ' style={{ lineHeight: '68px' }}>{t('global.password_reset.check_email')}</h1>
                <div className='flex flex-col items-center text-lg mb-6'>
                  <span className='text-neutral-silver-200'>{t('global.password_reset.email_sent_to')}</span>
                  <span>{emailSentTo}</span>
                </div>
                <div className='text-neutral-silver-300 text-sm mb-3 text-center'>
                {t('global.password_reset.tip')}
                </div>
                <div className='flex items-center justify-center'>
                  <NavLink to='/sign-in' className='text-brand-gold h-10 md:h-auto hover:text-brand-bronze font-semibold text-lg py-1.5'>
                  {t('global.cancel')}
                  </NavLink>
                </div>
              </motion.div>
        </>
      }
      </div>
    </>
  )
}
