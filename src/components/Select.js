export default function Select({ options, label }) {
  return (
    <>
      <div className='flex flex-col gap-1.5'>
        <label>{label}</label>
        <select className='custom-select'>
          {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
      </div>
    </>
  )
}