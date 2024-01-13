import { classNames, format } from 'utils/helpers';

export default function ProgressBar({ timeProgress, duration, progressBarRef, audioRef, open }) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  return (
    <>
      <div className={classNames({
        'w-full flex items-center player-progressbar': true,
        'flex-col gap-2': open,
        'gap-1.5': !open
      })}>
        {open && (
          <div className='grid grid-cols-2 w-full'>
            <div className='text-sm'>{format.time(timeProgress)}</div>
            <div className='text-sm text-right text-neutral-silver-200'>{format.time(duration)}</div>
          </div>
        )}
        <input
          type='range'
          defaultValue={0}
          className={classNames({
            'bg-neutral-black rounded-lg accent-white appearance-none': true,
            'h-1.5': open,
            'h-[3px]': !open
          })}
          ref={progressBarRef}
          onChange={handleProgressChange}
        />
      </div>
    </>
  )
}