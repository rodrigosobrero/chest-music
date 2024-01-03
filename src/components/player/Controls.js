/* shuffle button disabled */

import { useRef, useState, useCallback, useEffect } from 'react';

import { ReactComponent as RepeatIcon } from 'assets/images/icon-repeat.svg';
import { ReactComponent as NextIcon } from 'assets/images/icon-next.svg';
import { ReactComponent as PreviousIcon } from 'assets/images/icon-previous.svg';
import { ReactComponent as ShuffleIcon } from 'assets/images/icon-shuffle.svg';
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as PauseIcon } from 'assets/images/icon-pause.svg';
import { useDispatch, useSelector } from 'react-redux';
import { play } from 'app/playlist';

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  setLoop,
  loop
}) {
  const playAnimationRef = useRef();
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.playlist.playlist)
  
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
    dispatch(play())
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
    if (playlist[0]?.isPlaying) {
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

  }, [loop, audioRef, repeat, playlist]);

  return (
    <>
      <div className='flex items-center'>
        <button type='button' className='p-2 mr-2 disabled:opacity-30' disabled>
          <ShuffleIcon />
        </button>
        <button type='button' onClick={skipBackward} className='p-2 player-controls'>
          <PreviousIcon />
        </button>
        <button type='button' onClick={togglePlayPause} className='player-controls'>
          {playlist[0]?.isPlaying ? 
            <PauseIcon width={40} height={40} /> :
            <PlayIcon width={40} height={40} />
          }
        </button>
        <button type='button' onClick={skipForward} className='p-2 player-controls'>
          <NextIcon />
        </button>
        <button 
          type='button' 
          className={`p-2 ml-2 ${loop ? 'player-controls-active' : 'player-controls'}`} 
          onClick={toggleLoop}>
          <RepeatIcon />
        </button>
      </div>
    </>
  )
}