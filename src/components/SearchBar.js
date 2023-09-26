export default function SearchBar({ className, onChange, placeholder = 'Search a treasure...' }) {
  return (
    <>
      <input 
        type='search' 
        placeholder={placeholder} 
        className={`search-input ${className}`} 
        onChange={onChange} />
    </>
  )
}