import { classNames } from 'utils/helpers';

export default function ProgressBar({ progress, direction, color, size, background, mobile }) {
  const innerStyle = {
    width: `${progress}%`
  }

  return (
    <>
      <div className={classNames({
        'flex rounded-[3px] h-1.5': true,
        'w-[150px]': size === '150',
        'w-full': size === 'full',
        'justify-end': direction === 'right',
        'justify-start': direction === 'left',
        'bg-neutral-silver-600': background === 'gray',
        'bg-neutral-black': background === 'black',
      })}>
        <div 
          style={innerStyle} 
          className={classNames({
            'w-0 h-full rounded-[3px] transition-transform duration-500': true,
            'bg-brand-uva': color === 'violet',
            'bg-brand-gold': color === 'orange',
            'bg-error-red': color === 'red'
          })}></div>
      </div>
    </>
  )
}