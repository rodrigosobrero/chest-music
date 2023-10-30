import React from 'react'

const Toggle = ({ onChange }) => {
  return (
   <label className="relative inline-flex items-center cursor-pointer -mb-6">
        <input type="checkbox" value="" className="sr-only peer" onChange={onChange}/>
        <div className="w-11 h-6 bg-neutral-silver-400 peer-focus:outline-none peer-focus:ring-4 
        peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full
        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
        after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
        after:w-5 after:transition-all  peer-checked:bg-green-600 "></div>
  </label>
  )
}

export default Toggle