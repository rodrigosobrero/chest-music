
const DropdownSearch = ({ filteredOptions = [], handleOptionSelect }) => {
  return (
    <div className="text-white mt-20 md:w-full w-full md:pr-20 pr-12 h-full max-h-[50%]" style={{ position: 'absolute', zIndex: 999 }}>
      <ul className={`rounded-xl ${filteredOptions.length > 0 ? 'border' : 'border-none'}
                    border-neutral-silver-500 max-h-[90%] overflow-auto bg-neutral-black mt-1`}>
        {filteredOptions.map((option, index) => (
          <li key={option.full_name} onClick={() => handleOptionSelect(index)} 
              className='py-3 px-4 text-base hover:bg-neutral-silver-600 
                         text-left border-b border-b-neutral-silver-600'>
            {option.full_name} <span className='text-neutral-silver-300'>@{option.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownSearch;

