import { classNames } from 'utils/helpers';

export default function Button({ type, text, onClick, disabled }) {
  return (
    <>
      <button 
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={classNames({
          'btn btn-secondary': type === 'secondary',
          'btn btn-primary': type === 'primary'
        })}>
          {text}
      </button>
    </>
  )
}