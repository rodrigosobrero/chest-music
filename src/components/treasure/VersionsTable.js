import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import VersionsRow from './VersionsRow';
import { AnimatePresence, motion } from 'framer-motion';

export default function VersionsTable({ project }) {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (isMobile) {
      setTitles([
        'title',
        '',
      ])
    } else {
      setTitles([
        'title',
        'version',
        'plays',
        'date added',
        'length',
        '',
      ])
    }
  }, [])

  return (
    <>
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
            project?.versions?.map((version, index) =>
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
    </>
  )
}