import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import { motion } from 'framer-motion';
import { useLazyGetTrackSourceQuery, useUpdateTrackPlayMutation } from 'store/api';
import { reset, player, play } from 'app/playlist';

import ProgressBar from 'components/player/ProgressBar';
import ProgressBarMobile from 'components/player/ProgressBarMobile';
import Controls from 'components/player/Controls';
import ControlsMobile from 'components/player/ControlsMobile';
import VolumeControls from 'components/player/VolumeControls';
import Track from 'components/player/Track';
import TrackMobile from 'components/player/TrackMobile';

import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { closePlayer, openPlayer } from 'app/player';

export default function Player() {
  const dispatch = useDispatch();
  const { playlist, playing } = useSelector(state => state.playlist);
  const { user } = useSelector(state => state.auth);

  const [getTrackSource, getResult] = useLazyGetTrackSourceQuery();
  const [updateTrackPlay, updateResult] = useUpdateTrackPlayMutation();

  const [loop, setLoop] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState();
  const [open, setOpen] = useState(false);
  const [lastPlayed, setLastPlayed] = useState();

  const audioRef = useRef();
  const progressBarRef = useRef();

  const toggleOpen = () => {
    setOpen(prev => !prev);
  }

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;

    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  useEffect(() => {
    if (open) {
      dispatch(openPlayer());
    } else {
      dispatch(closePlayer());
    }
  }, [open]);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    let track = trackList;
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
        getTrackSource(currentTrack.id)
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
  }, [playlist, getResult]);

  useEffect(() => {
    if (!trackList) {
      setLastPlayed('');
    } else {
      if (lastPlayed !== trackList.id) {
        setLastPlayed(trackList.id)
      }
    }
  }, [trackList]);

  useEffect(() => {
    // console.log(lastPlayed);
    console.log(trackList);
    console.log(playlist[0]);

    if (trackList && playlist[0].isPlaying) {
      if (playlist[0].token) {
        updateTrackPlay({
          anonymous: true,
          id: trackList.id,
          token: playlist[0].token
        });
      } else {
        updateTrackPlay({ id: trackList.id });
      }
    }
  }, [lastPlayed, playlist]);

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
          ) : 
           <>
              <div className={`${open ? 'audio-player-mobile-open' : 'audio-player-mobile'}`}>
              {!open ?               
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
                </div> :
                  <div className='bg-neutral-silver-700 rounded-3xl mb-3 gap-5 flex flex-col'>
                    <div className='px-2 pt-2 flex flex-row justify-between'>
                      <button type='button' className='p-2.5' onClick={toggleOpen}>
                        <ChevronDownIcon className='h-6 w-6 text-white' />
                      </button>
                      <button type='button' className='p-2.5'>
                        <EllipsisHorizontalIcon className='h-6 w-6 text-white' />
                      </button>
                    </div>
                    <TrackMobile {...{
                      currentTrack: trackList,
                      audioRef,
                      setDuration,
                      progressBarRef,
                      open
                    }} />
                  </div>}
                  <div  className={`${open && 'bg-neutral-silver-600 px-5 pb-5 pt-4 rounded-3xl flex flex-col gap-1.5'}`}>
                    <div className={`${open && 'flex items-center justify-center gap-1.5'}`}>
                      {open &&
                        <Controls {... {
                        audioRef,
                        progressBarRef,
                        duration,
                        setTimeProgress,
                        setLoop,
                        loop
                      }} />}
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
               {open && <div className='absolute top-0 left-0 w-screen h-screen bg-neutral-black'></div>}
              </>
          }
        </>
      )}
    </>
  )
}