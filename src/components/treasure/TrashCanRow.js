import { isDesktop } from 'react-device-detect';
import { format } from 'utils/helpers';
import TrashCanActionsButton from './TrashCanActionsButton';

export default function TrashCanRow({ item }) {
  return (
    <>
      <tr>
        <td>{item.title}</td>
        {isDesktop && (
          <>
            <td>{item.version}</td>
            <td>{item.date_moved}</td>
            <td>{format.date(item.days_remaining)}</td>
          </>
        )}
        <td>
          <div className='flex justify-end'>
            <TrashCanActionsButton id={item.id} />
          </div>
        </td>
      </tr>
    </>
  )
}