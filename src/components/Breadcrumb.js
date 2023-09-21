import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


export default function Breadcrumb({ items }) {
  const navigate = useNavigate();
  console.log(items)
  return (
    <>
      <nav className='breadcrumb xl:flex hidden'>
        <ul>
          {items.map((item, index) =>
            <li key={index} onClick={() => { navigate(item.link) }}>
              {item.name}
            </li>)
          }
        </ul>
      </nav>
      <nav className='xl:hidden'>
        <span className='text-brand-gold text-lg font-semibold flex gap-x-1 items-center'>
            <ArrowLeftIcon className="h-6 w-6 text-brand-gold" />
            {items[0].name}
        </span>
      </nav>
    </>
  )
}