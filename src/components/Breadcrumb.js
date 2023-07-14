import { useNavigate } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  const navigate = useNavigate();

  return (
    <>
      <nav className='breadcrumb'>
        <ul>
          {items.map((item, index) =>
            <li key={index} onClick={() => { navigate(item.link) }}>
              {item.name}
            </li>)
          }
        </ul>
      </nav>
    </>
  )
}