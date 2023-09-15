import React, { useMemo } from 'react'
import SharedRow from '../SharedRow';
import useMediaQuery from 'utils/useMediaQuery';

const RecentlyList = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const titles = useMemo(() => {
    if(isMobile) return [ 'title', '' ]
    else { return [
      'title',
      'album',
      'version',
      'date played',
      'length',
      'plays',
    ]
  }
  }, [isMobile]);
  return (
    <>
     <table>
         <thead>
             <tr>
                {
                  titles.map((title, index) => 
                    <th 
                      key={index} 
                      // onClick={() => { title && handleSortingChange(index) }} 
                      className={`${ !title && 'cursor-default'  } `}>
                        {title} 
                    </th>
                  )
                }
             </tr>
         </thead>
         <tbody>
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