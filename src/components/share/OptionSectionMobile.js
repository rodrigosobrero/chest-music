import React from 'react'

const OptionSectionMobile = () => {
  return (
    <div className="flex max-w-[100vw] items-center overflow-x-hidden space-x-2">
        <button
        className={`share-button 
            ${activeButton === 2 && 'move-left'}
            ${activeButton === 1 && 'isActive'}`}
        onClick={() => handleButtonClick(1)}>
        Generate Link
        </button>
        <button
        className={`share-button 
            ${activeButton === 2 && 'isActive !scale-140'}
        `}
        onClick={() => handleButtonClick(2)}>
        Instagram
        </button>
        <button
        className={`share-button 
            ${activeButton === 3 && 'isActive move-left'}
            ${activeButton === 2 && 'move-right'}`}
        onClick={() => handleButtonClick(3)}>
        Tiktok
        </button>
  </div>
  )
}

export default OptionSectionMobile