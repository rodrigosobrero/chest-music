export default function Breadcrumb({ items }) {
  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          { items.map((item, index) => <li key={index}>{item}</li>) }
        </ul>
      </nav>
    </>
  )
}