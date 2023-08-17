import React from 'react'
import { timeDifference } from 'utils/helpers'
const ManageRow = ({data}) => {
    
  return (
    <>
      <tr>
        <td>{data.name}</td>
        <td>@{data.username}</td>
        <td>{timeDifference(data.date)}</td>
        <td>X</td>
      </tr>
    </>
  )
}

export default ManageRow