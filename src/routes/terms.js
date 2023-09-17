import Ubication from 'components/Ubication'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Terms = () => {
  const location = useLocation()
  return (
    <>
      <div>
        <Ubication path={location.pathname}/>
      </div>
    </>
  )
}

export default Terms