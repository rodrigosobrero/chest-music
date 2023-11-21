import { firstLetterUpperCase, formatDate } from 'utils/helpers';

import ParticipantsActionsButtons from './ParticipantsActionsButton';

export default function TrashCanTable({ data, headers, user }) {
  const Rows = ({ cell }) => {
    return (
      <>
        <td className='text-lg'>
          {cell.full_name}
          {user.data.user_id === cell.user_id &&
            <span className='text-neutral-silver-300 ml-1'>
              (you)
            </span>
          }
          {cell.is_global &&
            <span className='text-neutral-silver-300 ml-1'>
              (global)
            </span>
          }
        </td>
        <td>{cell.role && firstLetterUpperCase(cell.role)}</td>
        <td>{cell.plays}</td>
        <td>{formatDate(cell.date_added)}</td>
        <td className='flex justify-end'>
          <ParticipantsActionsButtons participant={cell} />
        </td>
      </>
    )
  }

  return (
    <>
      <table className='custom-table'>
        <thead>
          <tr>
            {
              headers.map((header, index) =>
                <th key={index}>
                  {header}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((cell, index) => (
              <tr key={index}>
                <Rows cell={cell} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}