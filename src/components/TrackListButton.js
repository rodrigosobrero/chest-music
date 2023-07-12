export default function TrackListButton({ icon: Icon, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <>
      <button 
        type='button' 
        className='bg-neutral-silver-700 p-2 rounded-lg test'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        <Icon />
      </button>
    </>
  )
}