import { NavLink } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/Button';

import google from 'assets/images/logo-google.png';

export default function SignUp() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
        <div className='flex flex-col gap-6 text-center justify-center px-6 pt-10 pb-10 md:px-[120px] md:py-20 order-last md:order-1'>
          <h2>create a new chest</h2>
          <button type='button' className='flex items-center justify-center text-lg gap-3 bg-neutral-black rounded-xl w-full px-5 py-3'>
            <img src={google} alt='Google' width={32} height={32} />
            Sign up with Google
          </button>
          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-neutral-silver-500"></div>
            <span className="flex-shrink mx-6 font-bureau-grotesque-extended">or</span>
            <div className="flex-grow border-t border-neutral-silver-500"></div>
          </div>
          <div className='flex flex-col gap-4'>
            <Input type='text' label='Full name' placeholder='Write here' />
            <Input type='email' label='Email' placeholder='Write here' />
            <Input type='password' label='Password' placeholder='Write here' showHide={true} />
          </div>
          <Button text='Sign up' type='primary' disabled={true} />
          <NavLink to='/sign-in' className='text-brand-gold font-semibold text-lg'>
            Already have an account? Log in
          </NavLink>
        </div>
        <div className='signup-cover'></div>
      </div>
    </>
  )
}