import { firstLetterUpperCase, format } from 'utils/helpers';
import { AnimatePresence, motion } from 'framer-motion';

import ParticipantsActionsButtons from './ParticipantsActionsButton';

export default function ParticipantsTable({ data, headers, user }) {
  const Rows = ({ cell }) => {
    return (
      <>
        <td className='text-lg'>
          {cell.full_name}
          {user?.data.user_id === cell.user_id &&
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
        <td>{format.date(cell.date_added)}</td>
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
            data.map((cell) => (
              <AnimatePresence>
                <motion.tr 
                  key={cell.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <Rows cell={cell} />
                </motion.tr>
              </AnimatePresence>
            ))
          }
        </tbody>
      </table>
    </>
  )
}