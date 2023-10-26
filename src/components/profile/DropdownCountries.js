const DropdownCountries = ({ filteredOptions = [], handleOptionSelect }) => {
    return (
      <div className="text-white md:w-full w-full md:pr-20 pr-12  h-full max-h-[50%]" style={{ position: 'absolute', zIndex: 999 }}>
        <ul className={`rounded-xl ${filteredOptions.length > 0 ? 'border' : 'border-none'}
                      border-neutral-silver-500 max-h-48 md:max-h-[90%] overflow-auto bg-neutral-black mt-1`}
                      style={{ scrollbarWidth: 'none', scrollbarColor: '#000 #ccc' }}>
          {filteredOptions.map((option, index) => (
            <li key={option.country} onClick={() => handleOptionSelect(index)} 
                className='py-3 px-4 text-base hover:bg-neutral-silver-600 
                           text-left border-b border-b-neutral-silver-600'>
              {option.country} 
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DropdownCountries;
  
  