import React, { useMemo } from 'react'
import SharedRow from './SharedRow';
import useMediaQuery from 'hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

const SharedList = ({ tracks }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const { t } = useTranslation()
  
  const titles = useMemo(() => {
    if(isMobile) return [ 'Date shared', '' ]
    else { return [
      t('tables.title'),
      t('tables.album'),
      t('tables.version'),
      t('tables.date_shared'),
      t('tables.length'),
      t('tables.plays'),
      '',
    ]
  }
  }, [isMobile, t]);

  return (
    <>
      <table className='collapsed w-full'>
         <thead >
             <tr >
                {
                  titles.map((title, index) => 
                    <th 
                      key={index} 
                      // onClick={() => { title && handleSortingChange(index) }} 
                      className={`${ !title && 'cursor-default'} ${index === 0 && 'md:!pl-5'}`}>
                      {title} 
                    </th>
                  )
                }
             </tr>
         </thead>
         <tbody className='chest-rows'>
              {
                tracks?.map((track, index) =>
                  <SharedRow key={index} track={track} isMobile={isMobile} />
                )
              }
         </tbody>
      </table>
    </>
  )
}

export default SharedList