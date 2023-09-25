import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { firstLetterUpperCase } from 'utils/helpers';

import 'swiper/css';
import 'swiper/css/pagination';

import Button from 'components/Button';
import Input from 'components/Input';
import Tag from 'components/Tag';

import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import artist from 'assets/images/sign-up-artist.png';
import fan from 'assets/images/sign-up-fan.png';

export default function Setup() {
  const { t } = useTranslation();

  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(0);

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

  const StepOne = () => (
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
        <Button type='primary' disabled={!userType} text={t('setup.button')} onClick={() => { setStep(1) }} />
      </div>
    </>
  )

  const StepTwo = () => (
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
          <div className='flex flex-col gap-6 mb-6'>
            <Input type='text' name='username' label={t('setup.step_two.username')} helper={t('setup.step_two.helper')} required={true} />
            {userType === 'artist' &&
              <Input type='text' name='name' label={t('setup.step_two.artist_name')} required={true} />
            }
            <Input type='number' name='pin' label={t('setup.step_two.pin')} showHide={true} required={true} />
          </div>
          <div className='flex flex-col gap-4 mb-8'>
            <span className='font-semibold'>Plan</span>
            <div className='account-plan'>
              <input type='radio' id='free' value='free' name='plan' />
              <label htmlFor='free'>
                <span className='text-lg'>{t('setup.step_two.free')}</span>
                <p className='!text-sm'>{t('setup.step_two.free_description')}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='text-[28px]'>$0</span>
                  <span className='text-sm'>/{t('global.month')}</span>
                </div>
              </label>
            </div>
            <div className='account-plan'>
              <input type='radio' id='free' value='free' name='plan' disabled />
              <label htmlFor='free'>
                <span className='text-lg'>Premium</span>
                <p className='mb-4 !text-sm'>{t('setup.step_two.premium_description')}</p>
                <div className='h-full'>
                  <Tag>{t('global.coming_soon')}</Tag>
                </div>
              </label>
            </div>
          </div>
          <div className='flex items-center gap-3 mb-8'>
            <input type='checkbox' value='' className='' id='terms-and-conditions' />
            <label htmlFor='terms-and-conditions'>{t('setup.step_two.terms')} <Link to='/terms-and-conditions' className='text-brand-gold'>{t('setup.step_two.terms_link')}</Link></label>
          </div>
          <Button type='primary' text={t('setup.step_two.create_button')} disabled={true} />
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className='flex flex-col gap-8 items-center justify-center h-full pt-10 pb-10 md:px-[120px] md:py-20'>
        {step === 0 ? <StepOne /> : <StepTwo />}
      </div>
    </>
  )
}