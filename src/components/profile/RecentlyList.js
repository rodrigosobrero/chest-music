import React, { useMemo } from 'react'
import SharedRow from '../shared/SharedRow';
import useMediaQuery from 'hooks/useMediaQuery';
import useSort from 'hooks/useSort';
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const RecentlyList = ({ data: list }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { data, sortBy, tagOrdered, method } = useSort(list);
  const { t } = useTranslation();

  const titles = useMemo(() => {
    if(isMobile) return [ { title: 'title' }, { title: '' } ]
    else { return [
      { title: t('tables.title'), tag: 'title' },
      { title: t('tables.album'), tag: 'album' },
      { title: t('tables.version'), tag: 'version' },
      { title: t('tables.date_played'), tag: 'date_played' },
      { title: t('tables.length'), tag: 'lenght' },
      { title: t('tables.plays'), tag: 'plays'}
    ]
  }
  }, [isMobile, t]);
  
  return (
    <>
      <table className='collapsed w-full'>
         <thead className={isMobile && 'hidden'}>
             <tr>
                {
                  titles.map(({ title, tag }, index) => 
                    <th 
                      key={index} 
                      onClick={() => { tag && sortBy(tag) }} 
                      className={`${ !title && 'cursor-default'} ${index === 0 && 'md:!pl-5'}`}>
                      <span className='flex items-center gap-2 capitalize'>
                          {title} {tagOrdered === tag && (method === 'asc' ? <ChevronDownIcon className='h-4 w-4'/> : <ChevronUpIcon className='h-4 w-4'/> )}
                        </span>                    
                    </th>
                  )
                }
             </tr>
         </thead>
         <tbody className='chest-rows'>
              {
                data?.map((track, index) =>
                  <SharedRow key={index} track={track} isMobile={isMobile}  />
                )
              }
         </tbody>
      </table>
    </>
  )
}

export default RecentlyList