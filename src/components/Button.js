import { classNames } from 'utils/helpers';
import spinner from 'assets/images/icon-loading-claim.png';

export default function Button({ type = 'button', style, text, onClick, disabled, loading, customStyle, form, textStyle }) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        form={form}
        className={classNames({
          'btn btn-primary': style === 'primary',
          'btn btn-secondary': style === 'secondary',
          'btn btn-tertiary': style === 'tertiary',
          'btn btn-error': style === 'error',
          
        }) + customStyle}>
        {loading ?
          <img src={spinner} alt='' width={20} height={20} className='animate-spin' /> :
          <span className={textStyle}>{text}</span>
        }
      </button>
    </>
  )
}