import { useState } from 'react';
import cloud from 'assets/images/icon-cloud.svg';
import empty from 'assets/images/empty-chest.svg';
import ProgressBar from 'components/ProgressBar';
import SearchBar from 'components/SearchBar';
import Tag from 'components/Tag';
import TrackList from 'components/TrackList';
import tracksData from 'data/tracks.json';
import userData from 'data/user.json';

export default function Chest() {
  /* states */
  const [user, setUser] = useState(userData);
  const [tracks, setTracks] = useState(tracksData);
  const [searchValue, setSearchValue] = useState('');

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
        <div className='grid grid-cols-3 bg-neutral-black rounded-t-[32px] rounded-b-xl px-[60px] pt-10 pb-[26px]'>
          <div className='flex items-center gap-4'>
            <h2>my chest</h2>
            <Tag>{tracks.length} tracks</Tag>
          </div>
          <div className='flex items-center justify-center grow'>
            <SearchBar onChange={handleOnChange} />
          </div>
          <div className='flex items-center justify-end gap-4'>
            <div className='flex flex-col items-end justify-center gap-1.5'>
              <div className='flex flex-row gap-1 text-sm font-archivo'>
                <span className='text-neutral-silver-100'>{user.space_used} MB</span>
                <span className='text-neutral-silver-300'>of</span>
                <span className='text-neutral-silver-100'>{user.space / 1000} GB</span>
              </div>
              <ProgressBar 
                progress={100 * user.space_used / user.space} 
                color='violet'
                size='150'
                direction='right'
                background='gray' />
            </div>
            <div className='text-brand-uva font-thunder text-4xl'>
              {Math.round(100 * user.space_used / user.space)}%
            </div>
            <div className='bg-neutral-silver-700 p-2 rounded-[10px]'>
              <img src={cloud} alt='' width={28} height={28} />
            </div>
          </div>
        </div>
        <div className='bg-neutral-black rounded-b-[32px] rounded-t-xl px-[60px] pt-10 pb-[60px]'>
          {
            tracks.length > 0 ?
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