import 'swiper/css';
import 'swiper/css/navigation';

import slideOne from 'assets/images/cover-slide-1.jpeg';
import slideTwo from 'assets/images/cover-slide-2.png';
import slideThree from 'assets/images/cover-slide-3.jpeg';
import slideFour from 'assets/images/cover-slide-4.jpeg';
import slideFive from 'assets/images/cover-slide-5.jpeg';
import arrowLeft from 'assets/images/icon-arrow-sm-left.svg';
import arrowRight from 'assets/images/icon-arrow-sm-right.svg';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import InputFile from './InputFile';

export default function TrackCoverSelector({ preview, updatePreview }) {
  const { t } = useTranslation();

  const slides = [
    { image: slideOne, author: 'david.todo.ok' },
    { image: slideTwo, author: 'sarah.creative' },
    { image: slideThree, author: 'tom.illustrator' },
    { image: slideFour, author: 'emily.artistic' },
    { image: slideFive, author: 'michael.draughtsman' },
    { image: slideOne, author: 'david.todo.ok' },
    { image: slideTwo, author: 'sarah.creative' },
    { image: slideThree, author: 'tom.illustrator' },
    { image: slideFour, author: 'emily.artistic' },
    { image: slideFive, author: 'michael.draughtsman' },
  ]
  const [selectedFile, setSelectedFile] = useState();
  const [coverIndex, setCoverIndex] = useState(0);
  const [swiper, setSwiper] = useState();

  useEffect(() => {
    if (!selectedFile) {
      updatePreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFile);
    updatePreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  }

  const savePreview = (swiper) => {
    setCoverIndex(swiper.realIndex);
    updatePreview(slides[swiper.realIndex].image);
  }

  return (
    <>
      <div
        className={`flex items-center justify-center rounded-lg bg-neutral-silver-300 w-[140px] md:w-[160px] h-[140px] md:h-[160px] relative bg-cover mb-3 ${preview && 'bg-cover'}`}
        style={{ backgroundImage: `url("${preview ? preview : slides[coverIndex].image}")` }}>
      </div>
      <span className='text-neutral-silver-200 mb-4'>{t('upload.preview')}</span>
      <div className='w-full flex flex-row mb-[13px]'>
        <div className='grow'>
          <p className='text-lg font-semibold text-left'>{t('upload.presets')}</p>
        </div>
        <div className='flex gap-1'>
          <button type='button' onClick={() => { swiper?.slidePrev() }}>
            <img src={arrowLeft} alt='' width={32} height={32} />
          </button>
          <button type='button' onClick={() => { swiper?.slideNext() }}>
            <img src={arrowRight} alt='' width={32} height={32} />
          </button>
        </div>
      </div>
      <div className='w-full relative mb-3'>
        <div className='absolute m-auto left-0 right-0 w-14 md:w-[78px] h-14 md:h-[78px] rounded-lg border-2 border-white z-10'></div>
        <Swiper
          centeredSlides={true}
          slidesPerView={5}
          loop={true}
          slidesPerGroup={1}
          onInit={(swiper) => setSwiper(swiper)}
          onSlideChange={savePreview}
          breakpoints={{
            370: {
              spaceBetween: 16
            },
            640: {
              spaceBetween: 12
            }
          }}>
          {
            slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className='w-14 md:w-[78px] h-14 md:h-[78px] bg-cover rounded-lg'
                  style={{ backgroundImage: `url("${slide.image}")` }}></div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className='w-full text-center mb-10'>
        <span className='text-sm text-neutral-silver-300'>{t('global.by')} {slides[coverIndex].author}</span>
      </div>
      <div className='flex flex-row w-full gap-5'>
        <div className='flex flex-col text-left grow'>
          <span className='text-lg font-semibold'>{t('upload.upload_file')}</span>
          <span className='text-sm text-neutral-silver-200'>{t('upload.upload_filetype')}</span>
        </div>
        <div>
          <InputFile accept={'.jpg, .png'} text={t('upload.browse')} onChange={onSelectFile} />
        </div>
      </div>
    </>
  )
}