export default function Tag({ children }) {
  return (
    <>
      <span className='bg-neutral-silver-700 rounded-lg px-2 md:px-3 py-1 text-sm md:text-base text-neutral-silver-200 font-archivo'>
        {children}
      </span>
    </>
  )
}