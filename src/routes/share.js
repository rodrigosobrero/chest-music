import React, { useEffect, useState } from 'react'
// import track from 'data/track.json'
import LinkGenerate from 'components/share/sections/LinkGenerate';
import PostTwitter from 'components/share/sections/PostTwitter';
import SendDM from 'components/share/sections/SendDM';
import OptionSectionMobile from 'components/share/OptionSectionMobile';
import Story from 'components/share/sections/Story';
import OptionSectionDesktop from 'components/share/OptionSectionDesktop';
import Reel from 'components/share/sections/ReelTiktok';
import axios from 'axios';
import { apiUrl } from 'utils/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Share = () => {
  const [ status, setStatus ] = React.useState('generate');
  const [ isUnlimited, setIsUnlimited ] = React.useState(false)
  const user = useSelector((state) => state.auth.user);
  const [track, setTrack] = useState({})
  const toggleUnlimited = () => setIsUnlimited(!isUnlimited)
  const changeStatus = (status) => {
    setStatus(status);
  };
  const { trackId } = useParams()
  useEffect(() => {
    if(!user?.token)return
    axios.get(apiUrl + 'project/' + trackId, 
    { headers: { Authorization: `Bearer ${user?.token}` } })
    .then(({data}) => setTrack(data))
  }, [user?.token, trackId])
  return (
    <>
      <div className='md:w-[1200px] md:p-[60px]  md:rounded-3xl  w-full  pt-8 pb-10  bg-neutral-black md:my-10 md:gap-y-8'>
        <div className='flex flex-col items-center md:gap-y-6 gap-y-4'>
           <h3 className='md:text-[64px] text-[48px] text-center'> SHARE YOUR TREASURE </h3>
           <img src={track.cover} alt='track cover' className='md:w-[200px] md:h-[200px] w-[140px] h-[140px]'/>
           <div className='text-center flex flex-col md:gap-y-2 gap-y-1.5'>
             <h4 className='md:text-[22px] text-base uppercase font-semibold'>{track?.name}</h4>
             <h6 className='md:text-xl text-base text-neutral-silver-200'>
               {track?.versions?.length > 0 && track?.versions[0].name}
             </h6>
           </div>
          <div className='flex flex-col w-full md:items-center md:mt-0 mt-4'>
          <OptionSectionDesktop status={status} changeStatus={changeStatus} />
          <OptionSectionMobile status={status} changeStatus={changeStatus} />
              {status === 'generate' && <LinkGenerate versionId={track?.versions?.length > 0 && track?.versions[0].id} token={user?.token}/>}
              {status === 'post' && <PostTwitter toggleUnlimited={toggleUnlimited}/>}
              {status === 'story' && <Story token={user?.token} />}
              {status === 'send' && <SendDM toggleUnlimited={toggleUnlimited} token={user?.token} versionId={track?.versions?.length > 0 && track?.versions[0].id}/>}
              {status === 'reel' && <Reel />}
          </div>
        </div>
      </div>
    </>
    )
}

export default Share