export default function Select({ options, label, value, onChange, name, register, required }) {
  return (
    <>
      <div className='flex flex-col gap-1.5'>
        {label && <label>{label}</label>}
        {register ?
          <select
            value={value}
            onChange={onChange}
            className='custom-select capitalize'
            {...register(name, { required })}>
            {options?.map((option, index) => <option key={index} value={option}>{option}</option>)}
          </select>
          : <select
            value={value}
            onChange={onChange}
            className='custom-select capitalize'>
            {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
          </select>}
      </div>
    </>
  )
}