import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";

const NotificationReplyButton = ({ onClick, isOpen }) => {
  return (
    <>
      <button onClick={onClick} className={`reply-btn ${isOpen && 'isOpen'}`}>
         Reply
         {!isOpen ? <ChevronDownIcon className="h-4 w-4 ml-1" /> : <ChevronUpIcon className="h-4 w-4  ml-1"/>}
      </button>
    </>
  )
}

export default NotificationReplyButton