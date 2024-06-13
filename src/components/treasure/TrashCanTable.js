import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

import TrashCanRow from './TrashCanRow';

export default function TrashCanTable({ data }) {
  const { t } = useTranslation();
  const [titles, setTitles] = useState([]);

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
        t('tables.date_moved'),
        t('tables.days_remaining'),
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