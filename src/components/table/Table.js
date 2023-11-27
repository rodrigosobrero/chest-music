export default function Table({ data, headers, user }) {

  const formats = (row, cell) => {
    let render;

    if (cell.property === 'user_id') {
      console.log(user?.data.user_id)
      console.log(row.user_id)
      console.log(user?.data.user_id == row.user_id)

      if (user?.data.user_id == row.user_id) {
        console.log('si')
        // render = <><span className=' text-re'>{row[cell.property]}</span></>
        render = 'si';
      } else {
        render = row[cell.property]
      }
    } else {
      render = row[cell.property]
    }

    if (cell.visible) {
      return render;
    }
  }

  const Row = ({ row, cell }) => {
    return (
      <>
        <td>
          {formats(row, cell)}
        </td>
      </>
    )
  }

  return (
    <>
      <table className='custom-table'>
        <thead>
          <tr>
            {
              headers.map((header, index) => {
                if (header.visible) {
                  return (
                    <th key={index}>
                      {header.name}
                    </th>
                  )
                }
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, index) => (
              <tr key={index}>
                {
                  headers.map((cell, index) =>
                    <Row row={row} cell={cell} />
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}