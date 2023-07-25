import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";

const NotificationButton = ({ onClick, isOpen }) => {
  return (
    <>
      <button onClick={onClick} className={`reply-btn ${isOpen && 'isOpen'}`}>
         Reply
         {!isOpen ? <ChevronDownIcon className="h-4 w-4 text-white" /> : <ChevronUpIcon className="h-4 w-4 text-white"/>}
      </button>
    </>
  )
}

export default NotificationButton