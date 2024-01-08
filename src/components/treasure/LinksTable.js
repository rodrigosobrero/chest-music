import { format } from 'utils/helpers';
import { isMobile, isDesktop } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';

import LinksActionsButton from './LinksActionsButton';

import { ReactComponent as WebDisabled } from 'assets/images/icon-webdisabled.svg';

export default function LinksTable({ data, headers }) {
  const Rows = ({ cell }) => {
    console.log(cell)

    return (
      <>
        <td className='lg:text-lg'>
          <div>
            /{cell.token}
          </div>
          {isMobile &&
            <div className='text-sm text-neutral-silver-300'>
              — {cell.play_limit ? `${cell.plays}/${cell.play_limit} plays` : 'unlimited plays'}
            </div>
          }
        </td>
        <td>
          {isMobile && (
            cell.allow_web_play &&
            <div className='p-2 web-disabled'>
              <WebDisabled width={20} height={20} className='min-w-[20px] min-h-[20px]' />
            </div>
          )}
          {isDesktop && (cell.allow_web_play ? 'Yes' : 'No')}
        </td>
        {isDesktop && (
          <>
            <td>
              {cell.play_limit ? `${cell.plays}/${cell.play_limit}` : 'unlimited'}
            </td>
            <td>{format.date(cell.date_shared)}</td>
          </>
        )}
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