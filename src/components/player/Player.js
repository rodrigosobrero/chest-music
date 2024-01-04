import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import { useLazyGetTrackSourceQuery } from 'store/api';

import ProgressBar from 'components/player/ProgressBar';
import Controls from 'components/player/Controls';
import VolumeControls from 'components/player/VolumeControls';
import Track from 'components/player/Track';
import { playing, reset } from 'app/playlist';

export default function Player() {
  const [trigger, result, isFetching] = useLazyGetTrackSourceQuery()
  const { playlist } = useSelector(state => state);

  const [loop, setLoop] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState();

  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    reset();
  }, []);
  useLayoutEffect(() => {
    console.log(playlist)
    let currentTrack = playlist.playlist[0];
    console.log(currentTrack)

    if (currentTrack) {
      if (currentTrack.audio) {
        setTrackList({
          url: currentTrack.audio,
          cover_url: currentTrack.cover,
          name: currentTrack.name,
          authors: currentTrack.authors,
          type: currentTrack.type
        })
      }

      else {
        trigger(currentTrack.id)

        const { data } = result;

        if (data) {
          setTrackList({
            url: data.url,
            cover_url: currentTrack.cover,
            name: currentTrack.name,
            authors: currentTrack.authors,
            type: currentTrack.type
          })
        }
      }
    }
  }, [playlist, result]);

  return (
    <>
      <AnimatePresence>
        {trackList && (
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
                    setTimeProgress,
                    setLoop,
                    loop
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