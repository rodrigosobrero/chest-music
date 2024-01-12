import { BaseModal } from 'components/BaseModal'
import React, { useState } from 'react'
import Button from 'components/Button'
import { ReactComponent as WhatsappIcon } from 'assets/images/icon-whatsapp.svg'
import { ReactComponent as Formicon } from 'assets/images/icon-form.svg'
import Modal from 'components/Modal'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
const FeedbackModal = (props) => {

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }  

  const [active, setActive] = useState(0)
  const options = [
    {
      title: 'Tell us your experience',
      image: Formicon,
      description: 'Take this short survey and give us feedback on your experience with Chest BETA.'
    },
    {
      title: 'Report a problem',
      image: WhatsappIcon,
      description: 'Having a problem? Contact us directly so we can solve it as soon as possible.'
    },
  ]
  
  const Card = ({ title, description, image, isActive }) => {

    return <div className={`account-type-selector ${isActive && '!bg-neutral-black icon-active'} icon-modal`}>
                <div className='flex flex-col gap-6'>
                <div className='h-20'>
                  <h6 className='text-center !text-[28px] !font-archivo !text-white'>{title}</h6>
                </div>
                <a href='#!'>
                  <div className='bg-neutral-silver-700 lg:w-[261px] py-5 lg:py-0 lg:h-[140px] flex items-center rounded-xl justify-center'>
                    {image}
                  </div>
                </a>
                {/* <img className={`md:w-[264px] md:h-[140px] rounded-xl ${option.type === userType ? '!grayscale-0' : ''}`} /> */}
                <p className='text-lg leading-6 font-light'>{description}</p>
                </div>
           </div>
  }
  return (
    <BaseModal title='Give feedback' show={props.isOpen} onClose={handleClose}>
      <div className='text-center flex flex-col gap-8'>
        {/* <h3 className='!text-center'>k</h3> */}
        <div className='hidden lg:flex lg:gap-6'>
          {options.map((el) => (
            <Card title={el.title} description={el.description} image={<el.image />} />
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
                setActive(activeIndex)}}
              slideToClickedSlide={true}
              className='slider-account-type'>
            {options.map((el, index) => ( 
                <SwiperSlide> 
                  <Card title={el.title} image={<el.image/>} description={el.description} isActive={index === active}/>
                </SwiperSlide>
            ))}
        </Swiper>
        <Button style='tertiary' text='Cancel' customStyle='lg:!w-[212px] !mx-auto' onClick={handleClose} />
      </div>
    </BaseModal>
  )
}

export default FeedbackModal