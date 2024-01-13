import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import { motion } from 'framer-motion';
import { useLazyGetTrackSourceQuery } from 'store/api';
import { reset } from 'app/playlist';

import ProgressBar from 'components/player/ProgressBar';
import ProgressBarMobile from 'components/player/ProgressBarMobile';
import Controls from 'components/player/Controls';
import ControlsMobile from 'components/player/ControlsMobile';
import VolumeControls from 'components/player/VolumeControls';
import Track from 'components/player/Track';
import TrackMobile from 'components/player/TrackMobile';

import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Player() {
  const [trigger, result] = useLazyGetTrackSourceQuery()
  const { playlist } = useSelector(state => state.playlist);

  const [loop, setLoop] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState();
  const [open, setOpen] = useState(false);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    let track = trackList
    let currentTrack = playlist && playlist[0];

    if (currentTrack) {
      if (typeof track === 'object') {
        if (track.id === currentTrack.id) return;
      }

      if (currentTrack.audio) {
        setTrackList({
          url: currentTrack.audio,
          cover_url: currentTrack.cover,
          name: currentTrack.name,
          authors: currentTrack.authors,
          type: currentTrack.type,
          id: currentTrack.id
        })
      } else {
        trigger(currentTrack.id)
          .then(({ data }) => {
            if (data) {
              setTrackList({
                url: data.url,
                cover_url: currentTrack.cover,
                name: currentTrack.name,
                authors: currentTrack.authors,
                type: currentTrack.type,
                id: currentTrack.id
              })
            }
          })
      }
    }
  }, [playlist, result]);

  // const DesktopPlayer = () => (
  //   <motion.div
  //     className='audio-player'
  //     initial={{ height: 0 }}
  //     animate={{ height: 'auto' }}
  //     exit={{
  //       height: 0,
  //       transition: { delay: 0.7, duration: 1, ease: 'easeIn' }
  //     }}>
  //     <Track {...{
  //       currentTrack: trackList,
  //       audioRef,
  //       setDuration,
  //       progressBarRef
  //     }} />
  //     <div className='grow flex flex-col items-center justify-center gap-1.5'>
  //       <Controls {... {
  //         audioRef,
  //         progressBarRef,
  //         duration,
  //         setTimeProgress,
  //         setLoop,
  //         loop
  //       }} />
  //       <ProgressBar {...{
  //         progressBarRef,
  //         audioRef,
  //         timeProgress,
  //         duration
  //       }} />
  //     </div>
  //     <VolumeControls {...{
  //       audioRef
  //     }} />
  //   </motion.div>
  // )

  // const MobilePlayer = () => (
  //   <AnimatePresence>
  //     {open ? (
  //       <motion.div
  //         className='audio-player-mobile-open'
  //         initial={{ opacity: 0, y: 100 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         exit={{ opacity: 0 }}>
  //         <div className='bg-neutral-silver-700 rounded-3xl mb-3 gap-5 flex flex-col'>
  //           <div className='px-2 pt-2'>
  //             <button type='button' className='p-2.5' onClick={toggleOpen}>
  //               <ChevronDownIcon className='h-6 w-6 text-white' />
  //             </button>
  //           </div>
  //           <TrackMobile {...{
  //             currentTrack: trackList,
  //             audioRef,
  //             setDuration,
  //             progressBarRef,
  //             open
  //           }} />
  //         </div>
  //         <div className='bg-neutral-silver-600 px-5 pb-5 pt-4 rounded-3xl flex flex-col gap-1.5'>
  //           <div className='flex items-center justify-center gap-1.5'>
  //             <Controls {... {
  //               audioRef,
  //               progressBarRef,
  //               duration,
  //               setTimeProgress,
  //               setLoop,
  //               loop
  //             }} />
  //           </div>
  //           <ProgressBar {...{
  //             progressBarRef,
  //             audioRef,
  //             timeProgress,
  //             duration,
  //             open
  //           }} />
  //         </div>
  //       </motion.div>
  //     ) : (
  //       <motion.div
  //         className='audio-player-mobile'
  //         initial={{ opacity: 0, y: 10 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         exit={{ opacity: 0 }}>
  //         <div className='flex flex-row' onClick={toggleOpen}>
  //           <TrackMobile {...{
  //             currentTrack: trackList,
  //             audioRef,
  //             setDuration,
  //             progressBarRef
  //           }} />
  //           <ControlsMobile {... {
  //             audioRef,
  //             progressBarRef,
  //             duration,
  //             setTimeProgress,
  //             setLoop,
  //             loop
  //           }} />
  //         </div>
  //         <ProgressBarMobile {...{
  //           progressBarRef,
  //           audioRef,
  //           timeProgress,
  //           duration
  //         }} />
  //       </motion.div>
  //     )}
  //   </AnimatePresence>
  // )

  // return (
  //   trackList && (
  //     isDesktop ? <DesktopPlayer /> : <MobilePlayer />
  //   )
  // );

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;

    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <>
      {trackList && playlist.length > 0 && (
        <>
          <audio
            src={trackList.url}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
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
          ) : <>
            {open ? (
              <div className='audio-player-mobile-open'>
                <div className='bg-neutral-silver-700 rounded-3xl mb-3 gap-5 flex flex-col'>
                  <div className='px-2 pt-2'>
                    <button type='button' className='p-2.5' onClick={toggleOpen}>
                      <ChevronDownIcon className='h-6 w-6 text-white' />
                    </button>
                  </div>
                  <TrackMobile {...{
                    currentTrack: trackList,
                    audioRef,
                    setDuration,
                    progressBarRef,
                    open
                  }} />
                </div>
                <div className='bg-neutral-silver-600 px-5 pb-5 pt-4 rounded-3xl flex flex-col gap-1.5'>
                  <div className='flex items-center justify-center gap-1.5'>
                    <Controls {... {
                      audioRef,
                      progressBarRef,
                      duration,
                      setTimeProgress,
                      setLoop,
                      loop
                    }} />
                  </div>
                  <ProgressBarMobile {...{
                    progressBarRef,
                    audioRef,
                    timeProgress,
                    duration,
                    open
                  }} />
                </div>
              </div>
            ) : (
              <div className='audio-player-mobile'>
                <div className='flex flex-row' onClick={toggleOpen}>
                  <TrackMobile {...{
                    currentTrack: trackList,
                    audioRef,
                    setDuration,
                    progressBarRef
                  }} />
                  <ControlsMobile {... {
                    audioRef,
                    progressBarRef,
                    duration,
                    setTimeProgress,
                    setLoop,
                    loop
                  }} />
                </div>
                <ProgressBarMobile {...{
                  progressBarRef,
                  audioRef,
                  timeProgress,
                  duration
                }} />
              </div>
            )}
          </>
          }
        </>
      )}
    </>
  )
}