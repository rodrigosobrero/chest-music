import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useForm } from 'react-hook-form';
import { firstLetterUpperCase } from 'utils/helpers';
import axios from 'utils/api';
import 'swiper/css';
import 'swiper/css/pagination';
import Button from 'components/Button';
import Input from 'components/Input';
import Tag from 'components/Tag';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import artist from 'assets/images/sign-up-artist.png';
import fan from 'assets/images/sign-up-fan.png';
import ErrorMessage from 'components/ErrorMessage';

export default function Setup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const options = [
    {
      type: 'artist',
      image: artist,
      description: `If you make music, this option is for you. It doesn't matter if you are a singer, music producer, or DJ: if your music is your treasure, you have found its chest.`
    },
    {
      type: 'fan',
      image: fan,
      description: `If you came to listen to the music of your favorite friends and artists before anyone else, this is for you. Enjoy a simplified version of Chest adjusted to your needs.`
    }
  ]

  const handleSetup = async (data) => {
    setLoading(true);

    console.log('setup')

    try {
      await axios.post(`/account/${userType}/`, {
        username: data.username,
        full_name: data.name,
        plan: data.plan,
        email: user.data.email,
        pincode: data.pin,
        login_method: 'local'
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      navigate('/my-chest')
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const optionCard = (option, index) => {
    return (
      <div
        className={`account-type-selector ${option.type === userType ? '!bg-neutral-black !border-brand-gold !text-neutral-silver-200' : ''}`}
        key={index}
        onClick={() => { setUserType(option.type) }}>
        <div className='flex flex-col gap-6'>
          <h4 className='text-center'>{option.type}</h4>
          <img src={option.image} alt={option.type} width={264} height={140} className={`rounded-xl ${option.type === userType ? '!grayscale-0' : ''}`} />
          <p className='text-lg'>{option.description}</p>
        </div>
      </div>
    )
  }

  const stepOne = () => (
    <>
      <div className='flex flex-col items-center px-6'>
        <h2>{t('setup.title')}</h2>
        <p className='text-neutral-silver-200 text-[22px] font-normal'>{t('setup.subtitle')}</p>
      </div>
      <div className='hidden md:grid gap-8 grid-cols-2'>
        {options.map((option, index) => optionCard(option, index))}
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView={1.2}
        pagination={true}
        modules={[Pagination]}
        centeredSlides={true}
        slideToClickedSlide={true}
        className='slider-account-type'>
        {options.map((option, index) => <SwiperSlide key={index}>{optionCard(option, index)}</SwiperSlide>)}
      </Swiper>
      <div className='w-full md:w-1/4 px-6'>
        <Button style='primary' disabled={!userType} text={t('setup.button')} onClick={() => { setStep(1) }} />
      </div>
    </>
  )

  const stepTwo = () => (
    <>
      <div className='px-6 flex flex-col items-center'>
        <div>
          <h2 className='text-[64px] md:text-[76px]'>{t('setup.step_two.title')}</h2>
        </div>
        <div className='w-full max-w-[480px]'>
          <div className='flex gap-4 bg-neutral-silver-600 rounded-2xl p-3 pr-5 my-8'>
            <div className='bg-neutral-black rounded-xl p-3'>
              {userType === 'fan' ?
                <MusicalNoteIcon className='h-7 w-7 text-white' /> :
                <MicrophoneIcon className='h-7 w-7 text-white' />
              }
            </div>
            <div className='grow'>
              <div className='text-lg text-white font-semibold'>
                {t('setup.step_two.account', { role: firstLetterUpperCase(userType) })}
              </div>
              <div className='text-neutral-silver-200 font-normal'>{t('setup.step_two.selected')}</div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                type='button'
                className='bg-neutral-silver-700 text-brand-gold px-2 py-1 rounded-lg font-semibold'
                onClick={() => { setStep(0) }}>
                {t('setup.step_two.button')}
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSetup)}>
            <div className='flex flex-col gap-6 mb-6'>
              <Input
                type='text'
                name='username'
                label={t('setup.step_two.username')}
                helper={t('setup.step_two.helper')}
                required={true}
                register={register}
                error={errors.username && 'This field is required'} />
              {userType === 'artist' &&
                <Input
                  type='text'
                  name='name'
                  label={t('setup.step_two.artist_name')}
                  required={true}
                  register={register}
                  error={errors.name && 'This field is required'} />
              }
              <Input
                type='number'
                name='pin'
                label={t('setup.step_two.pin')}
                showHide={true}
                register={register} />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center'>
                <span className='font-semibold grow'>Plan</span>
                <ErrorMessage show={errors.plan} message='Select a plan' />
              </div>
              <div className='account-plan'>
                <input
                  type='radio'
                  id='free'
                  value='free'
                  name='plan'
                  {...register('plan', { required: true })} />
                <label htmlFor='free'>
                  <span className='text-lg'>{t('setup.step_two.free')}</span>
                  <p className='!text-sm text-left'>{t('setup.step_two.free_description')}</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <span className='text-[28px]'>$0</span>
                    <span className='text-sm'>/{t('global.month')}</span>
                  </div>
                </label>
              </div>
              <div className='account-plan'>
                <input
                  type='radio'
                  id='premium'
                  value='premium'
                  name='plan'
                  {...register('plan', { required: true })}
                  disabled />
                <label htmlFor='premium'>
                  <span className='text-lg'>Premium</span>
                  <p className='mb-4 !text-sm text-left'>{t('setup.step_two.premium_description')}</p>
                  <div className='h-full'>
                    <Tag>{t('global.coming_soon')}</Tag>
                  </div>
                </label>
              </div>
            </div>
            <div className='flex items-center justify-end h-14'>
              <ErrorMessage show={errors.terms} message='Accept Terms and Conditions' />
            </div>
            <div className='flex items-center gap-3 mb-8'>
              <input
                type='checkbox'
                name='terms'
                id='terms-and-conditions'
                {...register('terms', { required: true })} />
              <label htmlFor='terms-and-conditions'>{t('setup.step_two.terms')} <Link to='/terms-and-conditions' className='text-brand-gold'>{t('setup.step_two.terms_link')}</Link></label>
            </div>
            <Button
              style='primary'
              type='submit'
              text={t('setup.step_two.create_button')}
              disabled={loading}
              loading={loading} />
          </form>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className='flex flex-col gap-8 items-center justify-center h-full pt-10 pb-10 md:px-[120px] md:py-20 w-full'>
        {step === 0 ? stepOne() : stepTwo()}
      </div>
    </>
  )
}