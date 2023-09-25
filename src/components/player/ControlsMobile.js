/* shuffle button disabled */

import { useRef, useState, useCallback, useEffect } from 'react';

import { ReactComponent as RepeatIcon } from 'assets/images/icon-repeat.svg';
import { ReactComponent as NextIcon } from 'assets/images/icon-next.svg';
import { ReactComponent as PreviousIcon } from 'assets/images/icon-previous.svg';
import { ReactComponent as ShuffleIcon } from 'assets/images/icon-shuffle.svg';
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as PauseIcon } from 'assets/images/icon-pause.svg';

export default function ControlsMobile({
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
        <button type='button' onClick={togglePlayPause} className='player-controls'>
          {isPlaying ? 
            <PauseIcon width={40} height={40} /> :
            <PlayIcon width={40} height={40} />
          }
        </button>
      </div>
    </>
  )
}