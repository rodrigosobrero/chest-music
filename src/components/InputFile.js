import { useRef } from 'react';
import Button from 'components/Button';

export default function InputFile({ text, accept, onChange }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];

    if (!fileObj) return;

    event.target.value = null;
  }

  return (
    <>
      <input 
        type='file'
        className='hidden'
        ref={inputRef}
        onChange={onChange}
        accept={accept} />
      <Button style='secondary' text={text} onClick={handleClick} />
    </>
  )
}