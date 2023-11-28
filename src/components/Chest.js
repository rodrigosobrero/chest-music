import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bytesToSize } from 'utils/helpers';
import axios from 'utils/api';
import ProgressBar from 'components/ProgressBar';
import SearchBar from 'components/SearchBar';
import Tag from 'components/Tag';
import TrackList from 'components/TrackList';
import cloud from 'assets/images/icon-cloud.svg';
import empty from 'assets/images/empty-chest.svg';
import { updateUser } from 'app/auth';

export default function Chest() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('mychest/', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setTracks(response.data.projects);
      dispatch(updateUser({
        chest: response.data
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (event) => {
    const lowerCase = event.target.value.toLowerCase();
    setSearchValue(lowerCase);
  }

  const filteredTracks = tracks.filter(track => {
    if (searchValue === '') {
      return track;
    } else {
      return Object.values(track)
        .join(' ')
        .toLowerCase()
        .includes(searchValue)
    }
  });

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='flex md:grid md:grid-cols-3 bg-neutral-black rounded-t-3xl rounded-b-lg px-5 py-6 md:px-[60px] md:pt-10 md:pb-[26px]'>
          <div className='flex items-center md:gap-4 grow'>
            <h3 className='hidden md:block'>my chest</h3>
            <h4 className='block md:hidden'>my chest</h4>
            <div className='hidden md:block'>
              <Tag>{tracks?.length} tracks</Tag>
            </div>
          </div>
          <div className='hidden md:flex items-center justify-center grow'>
            <SearchBar onChange={handleOnChange} />
          </div>
          <div className='flex items-center justify-end gap-3 md:gap-4'>
            <div className='hidden md:flex flex-col items-end justify-center gap-1.5'>
              <div className='flex flex-row gap-1 text-sm font-archivo'>
                <span className='text-neutral-silver-100'>{bytesToSize(user?.data.used_storage)}</span>
                <span className='text-neutral-silver-300'>of</span>
                <span className='text-neutral-silver-100'>{bytesToSize(user?.data.total_space)}</span>
              </div>
              <ProgressBar 
                progress={100 * user?.data.used_storage / user?.data.total_space} 
                color='violet'
                size='150'
                direction='right'
                background='gray' />
            </div>
            <div className='text-brand-uva-light font-thunder text-4xl flex items-center justify-center'>
              {Math.round(100 * user?.data.used_storage / user?.data.total_space)}%
            </div>
            <div className='bg-neutral-silver-700 p-2 rounded-[10px]'>
              <img src={cloud} alt='' width={28} height={28} />
            </div>
          </div>
        </div>
        <div className='bg-neutral-black rounded-t-lg rounded-b-3xl pl-5 pr-4 pt-3 pb-8 md:px-[60px] md:pb-[60px] md:pt-10'>
          {
            tracks?.length > 0 ?
              <TrackList tracks={filteredTracks} /> :
              <div className='flex flex-col items-center gap-2'>
                <h4>Your chest is empty</h4>
                <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                  Start uploading your treasures through the upper section
                </p>
                <img src={empty} alt='' width={240} height={128} className='mb-5' />
              </div>
          }
        </div>
      </div>
    </>
  )
}