import { useRef, useState, useCallback, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

import previous from 'assets/images/icon-previous.svg';
import next from 'assets/images/icon-next.svg';
import shuffle from 'assets/images/icon-shuffle.svg';

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;

    setTimeProgress(currentTime);

    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / audioRef.current.duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  }

  const toggleLoop = () => {
    setLoop(prev => !prev);
  }

  const skipForward = () => {
    audioRef.current.currentTime += 15
  }

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    if (loop) {
      audioRef.current.loop = true;
    } else {
      audioRef.current.loop = false;
    }

    playAnimationRef.current = requestAnimationFrame(repeat);

  }, [isPlaying, loop, audioRef, repeat]);

  return (
    <>
      <div className='flex items-center'>
        <button type='button' className='p-2 mr-2 disabled:opacity-30' disabled>
          <img src={shuffle} alt='Shuffle' width={20} height={20} className='' />
        </button>
        <button type='button' onClick={skipBackward} className='p-2'>
          <img src={previous} alt='Previous' width={24} height={24} className='' />
        </button>
        <button type='button' onClick={togglePlayPause}>
          {isPlaying ? 
            <PauseIcon className='h-10 w-10 text-neutral-silver-200' /> :
            <PlayIcon className='h-10 w-10 text-neutral-silver-200' />
          }
        </button>
        <button type='button' onClick={skipForward} className='p-2'>
          <img src={next} alt='Next' width={24} height={24} className='' />
        </button>
        <button type='button' className='p-2 ml-2 text-white' onClick={toggleLoop}>
          <ArrowPathRoundedSquareIcon className={`h-6 w-6 transition duration-500 ${loop ? 'text-brand-gold' : 'text-gray-200'}`} />
        </button>
      </div>
    </>
  )
}