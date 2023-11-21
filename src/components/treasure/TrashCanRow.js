import { isDesktop } from 'react-device-detect';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function TrashCanRow({ item }) {
  return (
    <>
      <tr>
        <td>{item.title}</td>
        {isDesktop && (
          <>
            <td>{item.version}</td>
            <td>{item.date_moved}</td>
            <td>{item.days_remaining}</td>
          </>
        )}
        <td>
          <button type='button' className='p-2.5'>
            <ArrowUpIcon className='h-6 w-6 text-white' />
          </button>
        </td>
      </tr>
    </>
  )
}