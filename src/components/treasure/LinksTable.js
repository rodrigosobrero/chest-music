import { format } from 'utils/helpers';
import LinksActionsButton from './LinksActionsButton';

export default function LinksTable({ data, headers, user }) {
  const Rows = ({ cell }) => {
    return (
      <>
        <td className='text-lg'>
          /{cell.token}
        </td>
        <td>
          {cell.allow_web_play ? 'Yes': 'No'}
        </td>
        <td>
          {cell.play_limit ? `${cell.plays}/${cell.play_limit}`  : 'unlimited'}
        </td>
        <td>{format.date(cell.date_shared)}</td>
        <td className='flex justify-end'>
          <LinksActionsButton link={cell} />
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