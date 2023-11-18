import React from 'react'
import spinner from 'assets/images/icon-loading-claim.png';

const Loading = () => {
  return <img src={spinner} alt='' width={20} height={20} className='animate-spin' />
}

export default Loading