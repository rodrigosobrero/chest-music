import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';

import ProgressBar from 'components/player/ProgressBar';
import Controls from 'components/player/Controls';
import VolumeControls from 'components/player/VolumeControls';
import Track from 'components/player/Track';

// import ControlsMobile from './ControlsMobile';

export default function Player() {
  const { playlist } = useSelector(state => state.playlist);

  /* states */
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState([]);

  /* reference */
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    // playlist[0]
    setTrackList([]);
  }, [playlist])

  return (
    <>
      <AnimatePresence>
        {trackList.length > 0 && (
          <>
            {isDesktop ? (
              <motion.div
                className='audio-player'
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{
                  height: 0,
                  transition: { delay: 0.7, duration: 1, ease: 'easeIn' }
                }}>
                <Track {...{
                  currentTrack: trackList,
                  audioRef,
                  setDuration,
                  progressBarRef
                }} />
                <div className='grow flex flex-col items-center justify-center gap-1.5'>
                  <Controls {... {
                    audioRef,
                    progressBarRef,
                    duration,
                    setTimeProgress
                  }} />
                  <ProgressBar {...{
                    progressBarRef,
                    audioRef,
                    timeProgress,
                    duration
                  }} />
                </div>
                <VolumeControls {...{
                  audioRef
                }} />
              </motion.div>
            ) : (
              <motion.div
                className='audio-player-mobile'
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{
                  height: 0,
                  transition: { delay: 0.7, duration: 1, ease: 'easeIn' }
                }}>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  )
}