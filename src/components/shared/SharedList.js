import React, { useMemo } from 'react'
import SharedRow from './SharedRow';
import useMediaQuery from 'hooks/useMediaQuery';
import { add, playing } from 'app/playlist';
const SharedList = ({ tracks, dispatch }) => {
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
             <tr >
                {
                  titles.map((title, index) => 
                    <th 
                      key={index} 
                      // onClick={() => { title && handleSortingChange(index) }} 
                      className={`${ !title && 'cursor-default' } font-semibold`}>
                        {title} 
                    </th>
                  )
                }
             </tr>
         </thead>
         <tbody>
              {
                tracks?.map((track, index) =>
                  <SharedRow key={index} track={track} isMobile={isMobile} onClick={() => dispatch(add(track)) } />
                )
              }
         </tbody>
      </table>
    </>
  )
}

export default SharedList