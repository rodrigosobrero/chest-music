import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";

const NotificationReplyButton = ({ onClick, isOpen }) => {
  return (
    <>
      <button onClick={onClick} className={`reply-btn ${isOpen && 'isOpen'}`}>
         <span className={isOpen && 'text-neutral-silver-100 '}>REPLY</span>
         {isOpen ? <ChevronUpIcon className="h-4 w-4  ml-1 text-neutral-silver-100 " /> :  <ChevronDownIcon className="h-4 w-4 ml-1" /> }
      </button>

    </>
  )
}

export default NotificationReplyButton