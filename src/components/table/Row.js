export default function Row({ data, headers }) {
  return (
    <>
      {
        data.map((row, index) => (
          <tr key={index}>
            {
              headers.map((cell, index) => (
                <td key={index}>
                  {row[cell.property]}
                </td>
              ))
            }
          </tr>
        ))
      }
    </>
  )
}