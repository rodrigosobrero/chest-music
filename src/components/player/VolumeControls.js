/* clock button disabled */

import { useEffect, useRef, useState } from 'react';
import { 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon, 
  ClockIcon } from '@heroicons/react/24/outline';

export default function VolumeControls({ audioRef }) {
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(0);
  
  const volumeRef = useRef();

  const toggleMuted = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  }

  useEffect(() => {
    volumeRef.current.style.setProperty(
      '--range-progress',
      `${volumeRef.current.value}%`
    );

    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  return (
    <>
      <div className='flex items-center justify-end player-volume'>
        <button type='button' className='p-2 disabled:opacity-30' disabled>
          <ClockIcon className='h-6 w-6 text-neutral-silver-200' />
        </button>
        <button type='button' className='p-2' onClick={toggleMuted}>
          {volume === 0 ?
            <SpeakerXMarkIcon className='h-6 w-6 text-neutral-silver-200' /> :
            <SpeakerWaveIcon className='h-6 w-6 text-neutral-silver-200' />
          }
        </button>
        <input
          ref={volumeRef}
          type='range'
          value={volume}
          min={0}
          max={100}
          className='bg-neutral-black rounded-lg h-1.5 accent-white appearance-none'
          onChange={(e) => { setVolume(parseInt(e.target.value)) }} />
      </div>
    </>
  )
}