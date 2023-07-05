import { classNames } from 'utils/helpers';

export default function Button({ type, text, onClick }) {
  return (
    <>
      <button 
        type='button'
        onClick={onClick}
        className={classNames({
          'btn btn-secondary': type === 'secondary'
        })}>
          {text}
      </button>
    </>
  )
}