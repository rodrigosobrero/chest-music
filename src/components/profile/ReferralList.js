import React, { useMemo } from 'react'
import useMediaQuery from 'hooks/useMediaQuery';
import ReferralRow from './ReferralRow'
import useSort from 'hooks/useSort';
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const ReferralList = ({ data: list }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const { sortBy, method, data, tagOrdered } = useSort(list);
    const { t } = useTranslation();

    const titles = useMemo(() => { 
        if(!isMobile) { 
            return [
                { title: t('tables.name'), tag: 'name'},
                { title: t('tables.username'), tag: 'username' },
                { title: 'Plan', tag: 'plays' }, 
                { title: t('tables.subs_date'), tag: 'date_added' }, 
                { title: '' }
            ]
        }
        else return [ { title: t('tables.name'), tag: 'name' }, { title: '' }]
    }, [isMobile, t])

  return (
    <>
        <table>
            <thead>
            <tr>
             {titles.map(({ title, tag }, index) => 
                    <th 
                    key={index} 
                    onClick={() => { title && sortBy(tag) }} 
                    className={`${ !title && 'cursor-default' }`}>
                      <span className='flex items-center gap-2 capitalize'>
                        {title} {tagOrdered === tag && (method === 'asc' ? <ChevronDownIcon className='h-4 w-4'/> : <ChevronUpIcon className='h-4 w-4'/> )}
                      </span>                    
                    </th>
             )}
            </tr>
            </thead>
            <tbody>
            {
                data?.map((track, index) =>
                <ReferralRow data={track} isMobile={isMobile}/>
                )
            }
            </tbody>
        </table>
      </>
  )
}

export default ReferralList