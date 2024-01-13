import { format } from 'utils/helpers';

export default function ProgressBar({ timeProgress, duration, progressBarRef, audioRef, open }) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  return (
    <>
      <div className='w-full flex items-center gap-1.5 player-progressbar'>
        <div className='text-sm'>{format.time(timeProgress)}</div>
        <input
          type='range'
          defaultValue={0}
          className='bg-neutral-black rounded-lg h-1.5 accent-white appearance-none'
          ref={progressBarRef}
          onChange={handleProgressChange}
        />
        <div className='text-sm'>{format.time(duration)}</div>
      </div>
    </>
  )
}