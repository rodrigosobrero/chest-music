import Input from 'components/Input';
import Button from 'components/Button';

export default function PasswordReset() {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <h1 className=' text-[76px]'>password reset</h1>
        <p className='text-neutral-silver-200'>Enter your email address here to continue with your password reset</p>
        <div className=' w-72'>
          <Input type='email' label='Email' placeholder='Write here...' />
          <Button type='button' style=''></Button>
        </div>
      </div>
    </>
  )
}
