import React, { useMemo } from 'react'
import useMediaQuery from 'hooks/useMediaQuery';
import PermissionRow from './PermissionRow'
const PermissionsList = ({data, deleteListener }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)')
    const handleSortingChange = (index) => {
        console.log(index);
    }
    const titles = useMemo(() => { 
        if(!isMobile) return ['name', 'username','total plays', 'date added', '']
        else return ['name', '']
    }, [isMobile])

  return (
    <>
        <table>
            <thead>
            <tr>
             {titles.map((title, index) => 
                    <th 
                    key={index} 
                    onClick={() => { title && handleSortingChange(index) }} 
                    className={`${ !title && 'cursor-default' }`}>
                        {title}
                    </th>
             )}
            </tr>
            </thead>
            <tbody>
            {
                data?.map((track, index) =>
                <PermissionRow data={track} isMobile={isMobile} deleteListener={deleteListener}/>
                )
            }
            </tbody>
        </table>
      </>
  )
}

export default PermissionsList