import React from 'react'
import ManageRow from './ManageRow';
const ManageList = ({data}) => {
    const titles = [
        'name',
        'username',
        'date blocked',
        ''
      ];
    const handleSortingChange = (index) => {
        console.log(index);
    }
  return (
    <>
        <table>
            <thead>
            <tr>
                {
                titles.map((title, index) => 
                    <th 
                    key={index} 
                    onClick={() => { title && handleSortingChange(index) }} 
                    className={`${ !title && 'cursor-default' }`}>
                        {title}
                    </th>
                )
                }
            </tr>
            </thead>
            <tbody>
            {
                data.map((track, index) =>
                <ManageRow data={track}/>
                )
            }
            </tbody>
        </table>
      </>
  )
}

export default ManageList