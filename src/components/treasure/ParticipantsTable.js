import { isDesktop, isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import { firstLetterUpperCase, format } from 'utils/helpers';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ParticipantsActionsButtons from './ParticipantsActionsButton';
import useSort from 'hooks/useSort';

export default function ParticipantsTable({ data: list, headers, user }) {
  const { sortBy, data, method, tagOrdered } = useSort(list);
  
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
              headers.map(({ title, tag }, index) =>
                <th key={index} onClick={() => {tag && sortBy(tag)}}>
                  <span className='flex items-center gap-2 capitalize'>
                      {title} {tagOrdered === tag && (method === 'asc' ? <ChevronDownIcon className='h-4 w-4'/> : <ChevronUpIcon className='h-4 w-4'/> )}
                  </span>                    
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