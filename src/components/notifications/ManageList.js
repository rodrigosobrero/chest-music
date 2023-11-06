import React, { useMemo } from 'react'
import ManageRow from './ManageRow';
import useMediaQuery from 'hooks/useMediaQuery';
const ManageList = ({ data, privacyIsOpen }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)')
    const handleSortingChange = (index) => {
        console.log(index);
    }
    const titles = useMemo(() => {
        if(privacyIsOpen){
            if(!isMobile) return ['name', 'username','date blocked', '']
            else return ['date blocked', '']
        } else {
            if(!isMobile){
                return [ 'name', 'username', 'date allowed', '']} 
                else return ['date allowed', '']
            }
    }, [isMobile, privacyIsOpen])

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
                data.map((track, index) =>
                <ManageRow data={track} isMobile={isMobile}/>
                )
            }
            </tbody>
        </table>
      </>
  )
}

export default ManageList