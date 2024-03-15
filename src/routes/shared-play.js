import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom'
import { playing } from 'app/playlist';
import { useLazyGetSharedTrackQuery } from 'store/api';
import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from 'hooks/useModal';

import rectangle from 'assets/images/icon-rectangle.png'
import cover_track from 'assets/images/cover-track.png'
import og_cover from 'assets/images/og-cover.jpg';

const SharedPlay = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [track, setTrack] = useState({});
  const { onOpen: openLimitModal } = useModal('PlayLimitModal');
  const [getSharedTrack, { isLoading, isFetching }] = useLazyGetSharedTrackQuery();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) window.location.replace('https://chestmusic.com');

    getSharedTrack(token)
      .then(({ data }) => {
        setTrack(data);

        console.log('data', data)

        if (data.active) {
          dispatch(playing({
            id: data.version_name,
            album: data.album,
            cover: data.cover_url,
            name: data.title,
            authors: data.authors,
            type: 'project',
            audio: data.audio_url,
            isPlaying: false,
            token
          }));
        } else {
          openLimitModal();
        }
      }).catch(() => {
        window.location.replace('https://chestmusic.com');
      });
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <meta property='og:title' content={track.title} />
        <meta property='og:description' content={`${track?.authors[0]} ${t('shared.link')}.`} />
        <meta property='og:audio' content={track.audio_url} />
        <meta property='og:type' content='music.song' />
        <meta property='og:url' content={`${window.location.protocol}//${window.location.host}/shared-link?token=${searchParams.get('token')}`} />
        <meta property='og:image' content={og_cover} />
      </Helmet>
      <div className='lg:block hidden lg:container'>
        <AnimatePresence initial={false} mode='wait'>
          {isLoading || isFetching || Object.keys(track).length === 0 ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='animate-pulse lg:pt-[60px] lg:pb-[40px] flex lg:gap-x-12 items-center'>
              <div className='lg:w-[220px] lg:h-[220px] lg:rounded-lg bg-neutral-silver-600'></div>
              <div className='flex flex-col justify-center lg:gap-6' >
                <div className='bg-neutral-silver-600 h-6 w-24 rounded'></div>
                <div className='bg-neutral-silver-600 h-[68px] w-48 rounded'></div>
                <div className='bg-neutral-silver-600 h-7 w-32 rounded'></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='lg:pt-[60px] lg:pb-[40px] flex lg:gap-x-12 items-center'>
              <div>
                <img src={track?.cover_url} className='lg:w-[220px] lg:h-[220px] lg:rounded-lg' alt='cover track' />
              </div>
              <div className='flex flex-col'>
                <div className='lg:mb-6'>
                  <p className='text-left text-neutral-silver-200 !text-base flex items-center gap-2'>
                    {track?.album}
                    <img src={rectangle} alt='rectangle' className='h-[3px]' />
                    {track?.version_name}
                  </p>
                </div>
                <div className='lg:mb-3'>
                  <h2 className='lg:!text-[76px] !leading-[68px] !font-thunder-bold'>{track?.title}</h2>
                </div>
                <div>
                  <p className='text-left lg:!text-[22px] capitalize'>{track?.authors?.join(', ')}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='lg:pt-[20px] lg:pb-[80px]'>
          <div className='lg:p-10 bg-neutral-black flex lg:gap-x-20 rounded-2xl'>
            <div className='w-2/4 h-full flex flex-col gap-y-6'>
              <h3 className='!text-[64px] !font-thunder-bold pr-10 leading-[58px] text-neutral-silver-200'>
                If your music is your <br />treasure, it deserves  <br /> to have its chest.
              </h3>
              <div className='w-1/3'>
                <Link to={'https://chestmusic.com'} className='!w-fill btn btn-primary'>
                  Open chest
                </Link>
              </div>
            </div>
            <div className='w-2/4'>
              <img src={cover_track} alt='cover' className='w-[620px] h-[300px] rounded-lg' />
            </div>
          </div>
        </div>
      </div>
      <div className='p-3 h-full bg-neutral-black lg:hidden'>
        <div className='w-full h-[510px] bg-neutral-silver-700 rounded-3xl py-2'>
          <div className='mb-5 py-2 pt-4'>
            <p className='font-semibold'>
              {track && track.play_limit && (
                <>
                  <span className='text-brand-gold'>{track.play_limit - track.plays}</span> of {track.play_limit} plays remaining
                </>
              )}
            </p>
          </div>
          <div className='flex justify-center'>
            <img src={track?.cover_url} alt='cover' className='w-[286px] h-[286px] rounded-md' />
          </div>
          <div className='h-[160px] rounded-[20px] px-5 py-2 w-full bg-custom-opacity flex flex-col justify-center items-center'>
            <h5 className='uppercase font-thunder-bold !text-[36px] !leading-[32px]'>
              {track?.title}
            </h5>
            <p className='!text-base text-neutral-silver-200 capitalize'>
              {track?.authors?.join(', ')}
            </p>
          </div>
        </div>
      </div>
      {track.play_limit - track.plays > 0 && (
        <div className='hidden md:block fixed bottom-[102px] right-0 left-0 inset-x-0 max-w-max mx-auto'>
          <AnimatePresence>
            <motion.div
              transition={{ delay: 1, type: 'just' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className='px-6 py-3 bg-neutral-silver-600 rounded-t-xl'>
              {track && track.play_limit ? (
                <>
                  <span className='text-brand-gold'>{track.play_limit - track.plays}</span> of {track.play_limit} plays remaining
                </>
              ) : (
                <div className='bg-neutral-silver-500 h-7 w-[176px] rounded animate-pulse'></div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  )
}

export default SharedPlay