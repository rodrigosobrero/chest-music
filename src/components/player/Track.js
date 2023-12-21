import { useEffect } from 'react';

export default function Track({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef
}) {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;

    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  useEffect(() => {
    console.log('currentTrack:', currentTrack)
  }, [currentTrack]);

  return (
    <>
      <div className='flex items-center'>
        <audio
          src={currentTrack.url}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className='flex gap-4 items-center'>
          <div>
            <img src={currentTrack.cover_url} alt='' width={52} height={52} />
          </div>
          <div>
            <h5>{currentTrack.name}</h5>
            <h6 className='text-sm text-neutral-silver-200'>
              {currentTrack?.authors?.join(', ')}
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}