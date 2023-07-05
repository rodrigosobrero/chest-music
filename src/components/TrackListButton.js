export default function TrackListButton({ icon, onMouseEnter }) {
  return (
    <>
      <button 
        type='button' 
        className='bg-neutral-silver-700 p-2 rounded-lg' 
        onMouseEnter={onMouseEnter}>
        <img src={icon} alt='' width={24} height={24} />
      </button>
    </>
  )
}