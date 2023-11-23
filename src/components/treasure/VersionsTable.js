import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import VersionsRow from './VersionsRow';

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
              <VersionsRow
                key={index}
                project={project}
                version={version} />
            )
          }
        </tbody>
      </table>
    </>
  )
}