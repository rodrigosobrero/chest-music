import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import TrashCanRow from './TrashCanRow';

export default function TrashCanTable({ data }) {
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
        'date moved',
        'days remaning',
        '',
      ])
    }
  }, []);

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
            data?.map((item, index) =>
              <TrashCanRow
                key={index}
                item={item} />
            )
          }
        </tbody>
      </table>
    </>
  )
}