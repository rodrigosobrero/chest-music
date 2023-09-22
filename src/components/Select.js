export default function Select({ options, label, value, onChange }) {
  return (
    <>
      <div className='flex flex-col gap-1.5'>
        {label && <label>{label}</label>}
        <select value={value} onChange={onChange} className='custom-select capitalize'>
          {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
      </div>
    </>
  )
}