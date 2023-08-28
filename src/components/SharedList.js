import React, { useEffect, useMemo, useState } from 'react'
import SharedRow from './SharedRow';
import useMediaQuery from 'utils/useMediaQuery';

const SharedList = ({tracks}) => {

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const titlesDesktop = useMemo(() =>[
      'title',
      'album',
      'version',
      'date shared',
      'length',
      'plays',
      '',
    ], []);
  const titlesMobile = useMemo(() => [
    'title',
    ''
  ], [])
  const [titles, setTitles ]= useState(titlesDesktop)
  useEffect(() => {
    setTitles(isMobile ? titlesMobile : titlesDesktop)
  }, [isMobile, titlesMobile, titlesDesktop])
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