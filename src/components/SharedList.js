import React from 'react'
import SharedRow from './SharedRow';

const SharedList = ({tracks}) => {
    const titles = [
        'title',
        'album',
        'version',
        'date shared',
        'length',
        'plays',
        '',
      ];
    
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
                  <SharedRow key={index} track={track}  />
                )
              }
         </tbody>
      </table>
    </>
  )
}

export default SharedList