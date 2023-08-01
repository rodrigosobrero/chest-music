import React from 'react'
import GeneralRow from './GeneralRow'

const GeneralList = ({data}) => {
  return (
    <>
          {data?.map((el) => (
              <GeneralRow notification={el}/> 
          ))}
    </>  )
}

export default GeneralList