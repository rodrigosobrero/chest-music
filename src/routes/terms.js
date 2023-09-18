import Ubication from 'components/Ubication'
import React from 'react'
import { useLocation } from 'react-router-dom'
import data from 'data/terms'
const Terms = () => {
  const location = useLocation()
  const Item = ({ title, text }) => {
    return (
      <div>
        <h4 className='text-xl font-archivo'>{title}</h4>
        <p className='text-base text-neutral-silver-200 text-left'>{text}</p>
      </div>
    )
  }
  return (
    <>
      <div className='px-[60px]'>
        <Ubication path={location.pathname}/>
        <div className='flex flex-col mt-5 mb-8 gap-y-6'>
            <div>
                <h3 className='font-thunder-bold text-5xl font-bold'>Terms & conditions</h3>
                <h5 className='text-neutral-silver-200 text-lg'>Review user rights, legal responsibilities, and usage guidelines of the platform</h5>
            </div>
        </div>
        <div className='bg-neutral-black rounded-3xl p-8 flex flex-col gap-y-6'>
            {data.map((el) => (
              <Item title={el.title} text={el.text}/>
            ))}
        </div>

      </div>
    </>
  )
}

export default Terms