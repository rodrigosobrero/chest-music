import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function TableActionsButton({ icon: Icon, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <>
      <button 
        type='button' 
        className='border-[3px] border-transparent transition duration-300 active:border-neutral-silver-600 hover:bg-neutral-silver-700 p-2 rounded-lg'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        <EllipsisHorizontalIcon className='h-6 w-6 text-white' />
      </button>
    </>
  )
}