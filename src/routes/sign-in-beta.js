import { useEffect, useState } from 'react';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useModal } from 'hooks/useModal';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, provider } from 'utils/firebase';
import { apiSlice, useLazyGetBetaAccessQuery } from 'store/api';
import { saveUser } from 'app/auth';

import Input from 'components/Input';
import Button from 'components/Button';

import google from 'assets/images/logo-google.png';
import spinner from 'assets/images/icon-loading-claim.png';

export default function SignInBeta() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const { onOpen: openSignUpBetaModal } = useModal('SignUpBetaModal');
  const { onOpen: openBetaErrorModal } = useModal('BetaErrorModal');
  const [getBetaAccess] = useLazyGetBetaAccessQuery();

  const clearCache = () => {
    dispatch(apiSlice.util.resetApiState());
    dispatch(saveUser(undefined));
  }

  useEffect(() => {
    clearCache();

    const images = [spinner, google];

    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleSignIn = async (data) => {
    setLoading(true);

    getBetaAccess(data.email)
      .unwrap()
      .then((response) => {
        if (response.has_access) {
          if (response.has_firebase_account) {
            signInWithEmailAndPassword(auth, data.email, data.password)
              .then(() => { redirect('/my-chest') })
              .catch((error) => {
                handleFirebaseErrors(error.code)
              });
          } else {
            createUserWithEmailAndPassword(auth, data.email, data.password)
              .then(() => { redirect('/setup') })
              .catch((error) => {
                handleFirebaseErrors(error.code);
              });
          }
        } else {
          openBetaErrorModal();
        }
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const handleGoogleSignIn = () => {
    setLoadingGoogle(true);

    signInWithPopup(auth, provider)
      .then((data) => {
        getBetaAccess(data.user.email)
          .unwrap()
          .then((response) => {
            if (response.has_access) {
              redirect('/my-chest');
            } else {
              openBetaErrorModal();
            }
          })
      })
      .catch((error) => {
        handleFirebaseErrors(error.code);
      })
      .finally(() => {
        setLoadingGoogle(false);
      });
  }

  const handleFirebaseErrors = (errorCode) => {
    console.log('Firebase Error:', errorCode);

    let meta = { message: '' };

    if (errorCode === 'auth/popup-closed-by-user') {
      setLoadingGoogle(false);
      return;
    }

    if (errorCode === 'auth/invalid-login-credentials') {
      meta.message = 'Invalid user or password, please try again.';
    }

    if (errorCode === 'auth/email-already-in-use') {
      meta.message = 'This email is already in use. Please login.';
    }

    if (errorCode === 'auth/weak-password') {
      meta.message = 'The password strength is too weak. Please use 6 or more characters long.';
    }

    openBetaErrorModal(meta);
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full'>
        <div className='flex flex-col gap-6 text-center justify-center px-6 pt-10 pb-4 md:px-[120px] md:py-20 order-last md:order-1'>
          <h2 className='text-center'>{t('signin.beta.title')}</h2>
          <p className='text-neutral-silver-200'>{t('signin.beta.description')}</p>
          <button
            type="button"
            className="flex items-center justify-center text-lg gap-3 bg-neutral-black rounded-xl w-full px-5 py-3 h-14"
            disabled={loadingGoogle}
            onClick={handleGoogleSignIn}>
            {loadingGoogle ? (
              <img src={spinner} alt="" width={20} height={20} className="animate-spin" />
            ) : (
              <>
                <img src={google} alt="Google" width={32} height={32} />
                {t('signin.beta.button_google')}
              </>
            )}
          </button>
          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-neutral-silver-500"></div>
            <span className="flex-shrink mx-6 font-bureau-grotesque-extended">{t('global.divider')}</span>
            <div className="flex-grow border-t border-neutral-silver-500"></div>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)}>
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
                label={t('signin.beta.password')}
                name='password'
                placeholder={t('global.write_here')}
                showHide={true}
                register={register}
                required={true}
                error={errors.password && 'This field is required'} />
              <Button
                text={t('signin.beta.button')}
                textStyle='!font-semibold'
                style='primary'
                type='submit'
                disabled={loading}
                loading={loading} />
            </div>
          </form>
          <Button 
            onClick={openSignUpBetaModal}
            text={t('signin.beta.signup')} 
            customStyle='text-brand-gold' />
          {/* <NavLink to='/sign-up' className='text-brand-gold h-10 md:h-auto hover:text-brand-bronze font-semibold text-lg'>
            {t('signin.beta.signup')}
          </NavLink> */}
        </div>
        <div className='signin-cover-beta'></div>
      </div>
    </>
  )
}