export default function SearchBar({ onChange }) {
  return (
    <>
      <input 
        type='search' 
        placeholder='Search a treasure...' 
        className='search-input' 
        onChange={onChange} />
    </>
  )
}