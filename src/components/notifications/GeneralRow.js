import React, { useState, useEffect } from 'react'
import NotificationIcon from './NotificationIcon'
import { timeDifference } from 'utils/helpers'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { api } from 'utils/axios'
import { playing, play as togglePlay } from 'app/playlist';
const GeneralRow = ({ notification }) => {
  const [toggle, setToggle] = useState(false)
  const handleChange = () => setToggle(!toggle)
  const user = useSelector((state) => state.auth.user);
  const { playlist } = useSelector((state) => state.playlist);
  const [play, setPlay] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { i18n } = useTranslation()
  
  const dispatch = useDispatch()

  const playTrack = () => {
    if(notification.type === 'version_shared'){
        api.get(`/project/version/${notification.version_id}/url`,{
            headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(({ data }) => {
            dispatch(playing({
                id: notification.version_id,
                album: data.album,
                cover: data.cover_url,
                name: data.title,
                authors: data.authors,
                type: 'version',
                audio: data.url,
                isPlaying: true,
              }));
        })
    }
  }
  
  const handleOnCoverClick = (e) => {

    if (play) {
      return dispatch(togglePlay())
    }

    playTrack();
  }

  useEffect(() => {
    if(notification.type === 'version_shared') {
        setPlay(playlist[0]?.id === notification.version_id && playlist[0]?.type === 'version');
    }
  }, [playlist, notification.type]);

  useEffect(() => {
    if(notification.type === 'version_shared' && notification.version_id){
      setIsActive(true);
    };
  })

  return (
        <>
           <div className={`row md:!pr-5 flex  justify-between hover:bg-neutral-black icon ${isActive && 'cursor-pointer'}`} onClick={handleOnCoverClick}>
                <div className='flex space-x-4 items-center'>
                    <NotificationIcon  
                        type={notification.type} 
                        iconStyle={`md:h-7 md:w-7 h-5 w-5`} 
                        isPlaying={playlist[0]?.isPlaying}
                        containerStyle={'bg-neutral-black rounded-lg flex justify-center items-center p-2.5 md:p-3'}
                        />
                    <div>
                        <div className='md:text-xl text-base'>{notification.content[i18n.language === 'en' ? 'en' : 'es'].title}</div>
                        <div className='md:text-base text-sm text-neutral-silver-200'>
                            {notification.content[i18n.language === 'en' ? 'en' : 'es'].body}
                        </div>
                    </div>
                </div>
                <div className='justify-end md:flex  hidden pr-2'>
                      <span className='text-neutral-silver-200 text-sm'>
                          {timeDifference(notification.date)}
                      </span>
                </div>
            </div>
        </>
  )
}

export default GeneralRow