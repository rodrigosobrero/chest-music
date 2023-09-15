import React from 'react'

const Ubication = ({ path, className }) => {
  let pathnames = path.split('/')
  pathnames = pathnames.filter((el) => el !== '')  
  return <>
          <div className={className}>
            {pathnames?.length > 1 && pathnames.map((el, i) => {
              return  <span className='text-neutral-silver-200 capitalize text-sm font-archivo'>{el} {i !== pathnames.length - 1  && '> '}</span>
            })}
          </div>
        </>
}

export default Ubication