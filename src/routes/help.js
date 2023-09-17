import React from 'react'
import { useLocation } from 'react-router-dom'
import Ubication from 'components/Ubication'
import Input from 'components/Input'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import faqs from 'data/faqs.json'
import FAQItem from 'components/profile/FaqItem'


const Help = () => {
  const location = useLocation()
  return (
    <>
      <div className='px-[60px]'>
        <Ubication path={location.pathname}/>
        <div className='flex flex-col mt-5 mb-8 gap-y-6'>
        <div>
            <h3 className='font-thunder-bold text-5xl font-bold'>Help center</h3>
            <h5 className='text-neutral-silver-200 text-lg'>Access to frequently asked questions or get support to resolve your issues</h5>
        </div>
        <div className='w-full bg-neutral-black p-8 rounded-3xl flex flex-col gap-y-6'>
            <h4>Contact us</h4>
            <div className='flex w-full gap-x-6 flex-grow'>
                <div className='w-2/4'>
                   <Input type='email' label='Your email' placeholder='Write here'/>
                </div>
                <div className='w-2/4'>
                   <Input type='text' label='Subject' placeholder='Write here'/>
                </div>
            </div>
            <div>
                <Input type='text' label='Message' placeholder='Write here'/>
            </div>
            <div>

            <Button text={'Send message'} type='primary' disabled={true}/>
            </div>
        </div>
        <div className='p-8 bg-neutral-black rounded-3xl flex flex-col gap-y-4'>
            <div className='flex justify-between'>
              <h4>FAQs</h4>
              <SearchBar onChange={() => console.log('console')}/>
            </div>
            <div className='gap-y-4 flex flex-col '>
              {faqs.map((el) => (
                <FAQItem question={el.title} answer={el.content} />
              ))}
            </div>
        </div>
        
       </div>
      </div>
    </>
  )
}

export default Help