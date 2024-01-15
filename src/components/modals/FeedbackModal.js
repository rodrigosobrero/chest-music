import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { BaseModal } from 'components/BaseModal'
import Button from 'components/Button'

import { ReactComponent as WhatsappIcon } from 'assets/images/icon-whatsapp.svg'
import { ReactComponent as Formicon } from 'assets/images/icon-form.svg'

import 'swiper/css';
import 'swiper/css/pagination';

const FeedbackModal = (props) => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const options = [
    {
      title: t('feedback.form_title'),
      image: Formicon,
      description: t('feedback.form_description'),
      link: `${process.env['REACT_APP_FEEDBACK_FORM_' + i18n.language.toUpperCase()]}`
    },
    {
      title: t('feedback.wa_title'),
      image: WhatsappIcon,
      description: t('feedback.wa_description'),
      link: process.env.REACT_APP_FEEDBACK_WS
    },
  ];

  const Card = ({ title, description, image, isActive, link }) => (
    <a href={link} target='_blank'>
      <div className={`account-type-selector ${isActive && '!bg-neutral-black icon-active'} icon-modal`}>
        <div className='flex flex-col gap-6'>
          <div className='h-20'>
            <h6 className='text-center !text-[28px] !font-archivo !text-white'>{title}</h6>
          </div>
          <div className='bg-neutral-silver-700 lg:w-[261px] py-5 lg:py-0 lg:h-[140px] flex items-center rounded-xl justify-center'>
            {image}
          </div>
          <p className='text-lg leading-6 font-light'>{description}</p>
        </div>
      </div>
    </a >
  )

  return (
    <BaseModal title={t('feedback.title')} show={props.isOpen} onClose={handleClose}>
      <div className='text-center flex flex-col gap-8'>
        <div className='hidden lg:flex lg:gap-6'>
          {options.map((el) => (
            <Card title={el.title} description={el.description} key={el.title} image={<el.image />} link={el.link} />
          ))}
        </div>
        <Swiper
          spaceBetween={8}
          slidesPerView={1.2}
          pagination={true}
          modules={[Pagination]}
          centeredSlides={true}
          onSlideChange={(swiperCore) => {
            const {
              activeIndex,
            } = swiperCore;
            setActive(activeIndex)
          }}
          slideToClickedSlide={true}
          className='slider-account-type'>
          {options.map((el, index) => (
            <SwiperSlide key={el.description}>
              <Card title={el.title} image={<el.image />} description={el.description} isActive={index === active} link={el.link} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button style='tertiary' text={t('global.cancel')} customStyle='lg:!w-[212px] !mx-auto' onClick={handleClose} />
      </div>
    </BaseModal>
  )
}

export default FeedbackModal