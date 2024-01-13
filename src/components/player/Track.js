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

  return (
    <>
      <div className='flex items-center'>
        <audio
          src={currentTrack.url}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className='flex gap-4 items-center'>
          <div
            className='w-[52px] h-[52px] bg-cover rounded'
            style={{ backgroundImage: `url(${currentTrack.cover_url})` }}>
          </div>
          <div className='flex flex-col gap-0.5'>
            <span>{currentTrack.name}</span>
            <span className='text-sm text-neutral-silver-200'>
              {currentTrack?.authors?.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}