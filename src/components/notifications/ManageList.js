import React, { useMemo } from 'react'
import ManageRow from './ManageRow';
import useMediaQuery from 'hooks/useMediaQuery';
import useSort from 'hooks/useSort';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';

const ManageList = ({ data: list, privacyIsOpen, onDelete }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const { data, tagOrdered, sortBy, method } = useSort(list);
    const { t } = useTranslation();

    const titles = useMemo(() => {  
        
        if(privacyIsOpen){
            if(!isMobile) {
                return [
                    { title: t('tables.name'), tag: 'name' },
                    { title: t('tables.username'), tag: 'username' }, 
                    { title: t('tables.date_blocked'), tag: 'date' }, 
                    { title: ''} ]
            }
            else return [{ title: t('tables.date_blocked'), tag: 'date'} ,  { title: '' } ]
        } else {
            if(!isMobile){
                return [
                    { title: t('tables.name'), tag: 'name' }, 
                    { title: t('tables.username'), tag: 'username' }, 
                    { title: t('tables.date_allowed'), tag: 'date' }, 
                    { title: ''} ]} 
                else return [{ title: t('tables.date_allowed'), tag: 'date' }, { title: '' }]
            }

    }, [isMobile, privacyIsOpen, t]);

  return (
    <>
        <table className='separate'>
            <thead>
            <tr>
             {titles.map(({ title, tag }, index) => 
                    <th 
                    key={index} 
                    onClick={() => { tag && sortBy(tag) }} 
                    className={`${ !title && 'cursor-default'}`}>
                      <span className='flex items-center gap-2 capitalize'>
                        {title} {tagOrdered === tag && (method === 'asc' ? <ChevronDownIcon className='h-4 w-4'/> : <ChevronUpIcon className='h-4 w-4'/> )}
                      </span>
                    </th>
             )}
            </tr>
            </thead>
            <tbody>
               {
                data && data.map((track, index) => (
                    <ManageRow data={track} isMobile={isMobile} onDelete={onDelete}/>
                ))
               }
            </tbody>
        </table>
      </>
  )
}

export default ManageList