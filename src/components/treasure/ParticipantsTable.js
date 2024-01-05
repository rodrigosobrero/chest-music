import { isDesktop, isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import { firstLetterUpperCase, format } from 'utils/helpers';

import ParticipantsActionsButtons from './ParticipantsActionsButton';

export default function ParticipantsTable({ data, headers, user }) {
  const Rows = ({ cell }) => {
    return (
      <>
        <td className='lg:text-lg'>
          <div>
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
          </div>
          {isMobile &&
            <div className='text-sm text-neutral-silver-300'>
              {`${cell.role && firstLetterUpperCase(cell.role)} — ${cell.plays} plays`}
            </div>
          }
        </td>
        {isDesktop && (
          <>
            <td>{cell.role && firstLetterUpperCase(cell.role)}</td>
            <td>{cell.plays}</td>
            <td>{format.date(cell.date_added)}</td>
          </>
        )}
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
              <AnimatePresence key={cell.user_id}>
                <motion.tr
                  key={cell.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  <Rows key={cell.id} cell={cell} />
                </motion.tr>
              </AnimatePresence>
            ))
          }
        </tbody>
      </table>
    </>
  )
}