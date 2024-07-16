import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const NotificationReplyButton = ({ onClick, isOpen, expired }) => {
  const { t } = useTranslation()
  return (
    <>
      <button onClick={onClick} className={`reply-btn ${isOpen && 'isOpen'} ${expired && 'grayscale'}`}>
         <span className={isOpen && 'text-neutral-silver-100 '}>{t('global.reply')}</span>
         {isOpen ? <ChevronUpIcon className="h-4 w-4  ml-1 text-neutral-silver-100 " /> :  <ChevronDownIcon className="h-4 w-4 ml-1" /> }
      </button>

    </>
  )
}

export default NotificationReplyButton