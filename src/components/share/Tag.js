import React, { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/20/solid";

const Tag = ({title, deleteTag}) => {
  const [ isHover, setIsHover ] = useState(false)
  return (
     <div
          className="flex items-center gap-2 bg-neutral-black text-neutral-white border border-neutral-silver-600 px-2 py-1 rounded-xl font-archivo duration-200"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          {title}
          {isHover &&
            <button onClick={deleteTag}>
              <XMarkIcon class="h-4 w-4 text-error-red" />
            </button>
        }
      </div>
  )
}

export default Tag