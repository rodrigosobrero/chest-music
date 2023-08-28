import { useState } from 'react';
import { firstLetterUpperCase } from 'utils/helpers';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Button from 'components/Button';

import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import fan from 'assets/images/sign-up-artist.png';
import artist from 'assets/images/sign-up-fan.png';
import Input from 'components/Input';
import Tag from 'components/Tag';

export default function Setup() {
  const [userType, setUserType] = useState('');
  const [step, setStep] = useState(0);

  const onOptionChange = (e) => {
    setUserType(e.target.value);
  }

  let currentStep = '';

  const StepZero = () => (
    <>
      <div className='flex flex-col items-center'>
        <h2>welcome to chest</h2>
        <p className='text-neutral-silver-200 text-[22px]'>Choose your role</p>
      </div>
      <div className='hidden md:grid gap-8 grid-cols-2'>
        <div className='account-type'>
          <input type='radio' id='artist' value='artist' name='type' onChange={onOptionChange} />
          <label htmlFor='artist'>
            <h4>artist</h4>
            <img src={artist} alt='Artist' width={264} height={140} />
            <p>
              If you make music, this option is for you. It doesn't matter if you are a singer, music producer, or DJ: if your music is your treasure, you have found its chest.
            </p>
          </label>
        </div>
        <div className='account-type'>
          <input type='radio' id='fan' value='fan' name='type' onChange={onOptionChange} />
          <label htmlFor='fan'>
            <h4>fan</h4>
            <img src={fan} alt='Artist' width={264} height={140} />
            <p>
              If you came to listen to the music of your favorite friends and artists before anyone else, this is for you. Enjoy a simplified version of Chest adjusted to your needs.
            </p>
          </label>
        </div>
      </div>
      <Swiper
        spaceBetween={8}
        slidesPerView={1.1}
        pagination={true} modules={[Pagination]}>
        <SwiperSlide>
          <div className='account-type'>
            <input type='radio' id='artist' value='artist' name='type' onChange={onOptionChange} />
            <label htmlFor='artist'>
              <h4>artist</h4>
              <img src={artist} alt='Artist' width={264} height={140} />
              <p>
                If you make music, this option is for you. It doesn't matter if you are a singer, music producer, or DJ: if your music is your treasure, you have found its chest.
              </p>
            </label>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='account-type'>
            <input type='radio' id='fan' value='fan' name='type' onChange={onOptionChange} />
            <label htmlFor='fan'>
              <h4>fan</h4>
              <img src={fan} alt='Artist' width={264} height={140} />
              <p>
                If you came to listen to the music of your favorite friends and artists before anyone else, this is for you. Enjoy a simplified version of Chest adjusted to your needs.
              </p>
            </label>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className='w-full md:w-1/4'>
        <Button type='primary' disabled={!userType} text='Confirm' onClick={() => { setStep(1) }} />
      </div>
    </>
  )

  const StepOne = () => (
    <>
      <div className='flex flex-col items-center'>
        <h2>configure your account</h2>
      </div>
      <div className='w-full max-w-[480px]'>
        <div className='flex gap-4 bg-neutral-silver-600 rounded-2xl p-3 pr-5 mb-8'>
          <div className='bg-neutral-black rounded-xl p-3'>
            {userType === 'fan' ?
              <MusicalNoteIcon className='h-7 w-7 text-white' /> :
              <MicrophoneIcon className='h-7 w-7 text-white' />
            }
          </div>
          <div className='grow'>
            <div className='text-lg text-white font-semibold'>{firstLetterUpperCase(userType)} account</div>
            <div className='text-neutral-silver-200 font-normal'>Selected role</div>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='button'
              className='bg-neutral-silver-700 text-brand-gold px-2 py-1 rounded-lg font-semibold'
              onClick={() => { setStep(0) }}>
              Change
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-6 mb-6'>
          <Input type='text' name='username' label='Username' helper='You won’t be able to change this' required={true} />
          {userType === 'artist' &&
            <Input type='text' name='name' label='Artist name' required={true} />
          }
          <Input type='number' name='pin' label='PIN Code' showHide={true} required={true} />
        </div>
        <div className='flex flex-col gap-4 mb-8'>
          <span className='font-semibold'>Plan</span>
          <div className='account-plan'>
            <input type='radio' id='free' value='free' name='plan' />
            <label htmlFor='free'>
              <h5>Free</h5>
              <p>Limited cloud storage, up to 1 GB</p>
              <div className='flex items-center gap-2 mt-2'>
                <span className='text-[28px]'>$0</span>
                <span className='text-sm'>/month</span>
              </div>
            </label>
          </div>
          <div className='account-plan'>
            <input type='radio' id='free' value='free' name='plan' disabled />
            <label htmlFor='free'>
              <h5>Premium</h5>
              <p className='mb-4'>Extended cloud storage and more</p>
              <div className='h-full'>
                <Tag>Coming soon</Tag>
              </div>
            </label>
          </div>
        </div>
        <div className='flex items-center gap-3 mb-8'>
          <input type='checkbox' value='' className='' id='terms-and-conditions' />
          <label htmlFor='terms-and-conditions'>I have read and accept the <Link to='/terms-and-conditions' className='text-brand-gold'>Terms and Conditions</Link></label>
        </div>
        <Button type='primary' text='Create chest' disabled={true} />
      </div>
    </>
  )

  if (step === 0) {
    currentStep = <StepZero />;
  } else if (step === 1) {
    currentStep = <StepOne />;
  }

  return (
    <>
      <div className='flex flex-col gap-8 items-center justify-center h-full pt-10 pb-10 md:px-[120px] md:py-20'>
        {currentStep}
      </div>
    </>
  )
}