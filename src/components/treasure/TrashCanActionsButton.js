import { useModal } from 'hooks/useModal';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function TrashCanActionsButton({ id }) {
  const { onOpen } = useModal('RestoreTrashModal');

  const handleRestore = async () => {
    onOpen({ id })
  }

  return (
    <>
      <button
        type='button'
        className='p-2.5 transition duration-200 hover:text-brand-gold'
        onClick={handleRestore}>
        <ArrowUpIcon className='h-6 w-6' />
      </button>
    </>
  )
}