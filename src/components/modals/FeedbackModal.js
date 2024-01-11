import { BaseModal } from 'components/BaseModal'
import React from 'react'
import Button from 'components/Button'
const FeedbackModal = (props) => {

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }  

  const Card = ({ title, description }) => {
    return <div className={`account-type-selector`}>
                <div className='flex flex-col gap-6'>
                <h6 className='text-center !text-[28px] !font-archivo !text-white'>{title}</h6>
                {/* <img className={`md:w-[264px] md:h-[140px] rounded-xl ${option.type === userType ? '!grayscale-0' : ''}`} /> */}
                <p className='text-lg leading-6 font-light'>{description}</p>
                </div>
           </div>
  }
  return (
    <BaseModal title={'Dar Feedback'} onClose={handleClose} isOpen={props.isOpen}>
        <div className='flex gap-6'>
            <Card title={'Tell us your experience'} />
            <Card title={'Report a problem'} />
        </div>
        <Button style='tertiary' text='Cancel' customStyle='lg:!w-[212px] !mx-auto' />
    </BaseModal>
  )
}

export default FeedbackModal