import Input from "components/Input";

const DropdownSearch = ({ children, filteredOptions = [], handleOptionSelect }) => {
  return (
    <div className="relative md:w-full w-full ">
      {children}
      {filteredOptions.length > 0 && (
        <div className="absolute w-full z-10">
          <ul className="bg-neutral-black border border-neutral-silver-500 rounded-xl overflow-auto">
            {filteredOptions.map((option, index) => (
              <li key={option.full_name} onClick={() => handleOptionSelect(index)} 
                  className="py-3 px-4 text-base hover:bg-neutral-silver-600 text-left border-b border-neutral-silver-600">
                {option.full_name} <span className="text-neutral-silver-300">@{option.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Other content goes here, it won't be pushed down by the dropdown */}
    </div>
  );
};

export default DropdownSearch;

