import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


export default function Breadcrumb({ items, className }) {
  const navigate = useNavigate();
  return (
    <>
      <nav className={`breadcrumb ${className} xl:flex hidden`}>
        <ul>
          {items.map((item, index) =>
            <li key={index} onClick={() => { navigate(item.link) }}>
              {item.name}
            </li>)
          }
        </ul>
      </nav>
      <nav className={`${className} xl:hidden py-2`}>
        <span className='text-brand-gold text-lg font-semibold flex gap-x-1 items-center' onClick={() => navigate(items[0].link)}>
            <ArrowLeftIcon className="h-6 w-6 text-brand-gold" />
            {items[0].name}
        </span>
      </nav>
    </>
  )
}