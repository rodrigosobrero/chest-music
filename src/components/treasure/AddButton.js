import { PlusSmallIcon } from '@heroicons/react/20/solid';

export default function AddButton({ text, onClick }) {
  return (
    <button 
      type='button' 
      className='flex items-center gap-1.5 py-1.5 text-brand-gold text-base lg:text-lg font-semibold'
      onClick={onClick}>
      <PlusSmallIcon className='h-7 w-7' />
      {text}
    </button>
  )
}