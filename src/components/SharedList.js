import React, { useMemo } from 'react'
import SharedRow from './SharedRow';
import useMediaQuery from 'utils/useMediaQuery';

const SharedList = ({ tracks }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const titles = useMemo(() => {
    if(isMobile) return [ 'Date shared', '' ]
    else { return [
      'title',
      'album',
      'version',
      'date shared',
      'length',
      'plays',
      '',
    ]
  }
  }, [isMobile]);
  return (
    <>
     <table>
         <thead >
             <tr className='hover:rounded-xl hover:bg-neutral-silver-700'>
                {
                  titles.map((title, index) => 
                    <th 
                      key={index} 
                      // onClick={() => { title && handleSortingChange(index) }} 
                      className={`${ !title && 'cursor-default' }`}>
                        {title} 
                    </th>
                  )
                }
             </tr>
         </thead>
         <tbody>
              {
                tracks?.map((track, index) =>
                  <SharedRow key={index} track={track} isMobile={isMobile}  />
                )
              }
         </tbody>
      </table>
    </>
  )
}

export default SharedList