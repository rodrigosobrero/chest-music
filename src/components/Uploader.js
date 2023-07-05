import InputFile from 'components/InputFile';

export default function Uploader() {
  return (
    <>
      <div className='uploader'>
        <h3 className='mb-4'>drop it like it’s hot</h3>
        <p>Drag and drop your audio file here to upload a new track, or...</p>
        <InputFile accept={'.mp3'} />
      </div>
    </>
  )
}