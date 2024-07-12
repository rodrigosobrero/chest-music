import Input from 'components/Input';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { auth } from 'utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleReset = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        console.log('test')
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-full'>
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
      </div>
    </>
  )
}
