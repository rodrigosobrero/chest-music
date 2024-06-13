import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import VersionsRow from './VersionsRow';
import useSort from 'hooks/useSort';

export default function VersionsTable({ project }) {
  const { t } = useTranslation()
  const [titles, setTitles] = useState([]);
  // const { sortBy, data, method, tagOrdered } = useSort(project)
  useEffect(() => {
    if (isMobile) {
      setTitles([
        t('tables.title'),
        '',
      ])
    } else {
      setTitles([
        t('tables.title'),
        t('tables.version'),
        t('tables.plays'),
        t('tables.date_added'),
        t('tables.length'),
        '',
      ])
    }
  }, [])

  return (
    <>
      <div className='bg-neutral-silver-700 rounded-2xl px-4 py-3'>
        <table>
          <thead>
            <tr>
              {
                titles.map((title, index) =>
                  <th
                    key={index}
                    className={`${!title && 'cursor-default'}`}>
                    {title}
                  </th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              project?.versions?.map((version) =>
                <AnimatePresence key={version.id}>
                  <motion.tr
                    key={version.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <VersionsRow
                      key={version.id}
                      project={project}
                      version={version} />
                  </motion.tr>
                </AnimatePresence>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}