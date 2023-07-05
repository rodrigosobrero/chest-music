export default function InputFile({ accept }) {
  return (
    <>
      <input type='file' accept={accept} className='file-input' title='' />
    </>
  )
}