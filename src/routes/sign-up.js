import { useState } from 'react';
import { NavLink, redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth, provider } from 'utils/firebase';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Button from 'components/Button';
import google from 'assets/images/logo-google.png';
import spinner from 'assets/images/icon-loading-claim.png';

export default function SignUp() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleSignUp = (data) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => { redirect('/setup') })
      .catch((error) => {
        handleFirebaseErrors(error.code);
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const handleGoogleSignUp = () => {
    setLoadingGoogle(true);

    signInWithPopup(auth, provider)
      .then(() => { redirect('/setup') })
      .catch((error) => {
        handleFirebaseErrors(error.code);
      })
      .finally(() => {
        setLoadingGoogle(false);
      });
  }

  const handleFirebaseErrors = (errorCode) => {
    console.log('Firebase Error:', errorCode);

    if (errorCode === 'auth/popup-closed-by-user') {
      setLoadingGoogle(false);
      return;
    }

    setModalOpen(true);

    if (errorCode === 'auth/email-already-in-use') {
      setModalMessage('This email is already in use. Please login.');
    }

    if (errorCode === 'auth/weak-password') {
      setModalMessage('The password strength is too weak. Please use 6 or more characters long.')
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full'>
        <div className='flex flex-col gap-6 text-center justify-center px-6 pt-10 pb-10 md:px-[120px] md:py-20 order-last md:order-1'>
          <h2 className='text-center'>{t('signup.title')}</h2>
          <button
            type='button'
            className='flex items-center justify-center text-lg gap-3 bg-neutral-black rounded-xl w-full px-5 py-3 h-14'
            disabled={loadingGoogle}
            onClick={handleGoogleSignUp}>
            {loadingGoogle
              ? <img src={spinner} alt='' width={20} height={20} className='animate-spin' />
              : <>
                <img src={google} alt='Google' width={32} height={32} />
                {t('signup.button_google')}
              </>}
          </button>
          <div className="relative flex items-center w-full">
            <div className='flex-grow border-t border-neutral-silver-500'></div>
            <span className='flex-shrink mx-6 font-bureau-grotesque-extended'>{t('global.divider')}</span>
            <div className='flex-grow border-t border-neutral-silver-500'></div>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className='flex flex-col gap-4'>
              <Input
                type='email'
                label='Email'
                name='email'
                placeholder={t('global.write_here')}
                register={register}
                required={true}
                error={errors.email && 'This field is required'} />
              <Input
                type='password'
                label={t('global.password')}
                name='password'
                placeholder={t('global.write_here')}
                showHide={true}
                register={register}
                required={true}
                error={errors.password && 'This field is required'} />
              <Button
                text={t('signup.button')}
                style='primary'
                type='submit'
                disabled={loading}
                loading={loading} />
            </div>
          </form>
          <NavLink to='/sign-in' className='text-brand-gold font-semibold text-lg'>
            {t('signup.login')}
          </NavLink>
        </div>
        <div className='signup-cover'></div>
      </div>
      <Modal show={modalOpen} setShow={setModalOpen}>
        <div className='flex flex-col items-center text-center max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>error</h4>
          <p className='text-neutral-silver-200 text-lg mb-6'>{modalMessage}</p>
        </div>
        <div className='w-full'>
          <Button text='Close' style='primary' onClick={() => { setModalOpen(false) }} />
        </div>
      </Modal>
    </>
  )
}