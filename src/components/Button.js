import { classNames } from 'utils/helpers';
import spinner from 'assets/images/icon-loading-claim.png';

export default function Button({ type = 'button', style, text, onClick, disabled, loading, customStyle }) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classNames({
          'btn btn-third': style === 'third',
          'btn btn-secondary': style === 'secondary',
          'btn btn-primary': style === 'primary',
        }, {customStyle})}>
        {loading ?
          <img src={spinner} alt='' width={20} height={20} className='animate-spin' /> :
          <span>{text}</span>
        }
      </button>
    </>
  )
}