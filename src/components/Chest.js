import { useEffect, useState } from 'react';
import { format } from 'utils/helpers';
import { useGetChestQuery } from 'store/api';

import ProgressBar from 'components/ProgressBar';
import SearchBar from 'components/SearchBar';
import Tag from 'components/Tag';
import TrackList from 'components/TrackList';

import cloud from 'assets/images/icon-cloud.svg';
import empty from 'assets/images/empty-chest.svg';

export default function Chest() {
  const [usedSpace, setUsedSpace] = useState(0);

  const { 
    data: chest = [],
    isLoading,
    isFetching,
  } = useGetChestQuery();
  
  useEffect(() => {
    setUsedSpace(Math.round(100 * chest.used_space / chest.total_space));
  }, [chest]);

  if (isLoading || isFetching) {
    return (
      <>
        <div className='flex flex-col gap-1 animate-pulse'>
          <div className='bg-neutral-black rounded-t-3xl rounded-b-lg h-[124px]'></div>
          <div className='bg-neutral-black rounded-t-lg rounded-b-3xl h-[300px]'></div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='flex md:grid md:grid-cols-3 bg-neutral-black rounded-t-3xl rounded-b-lg px-5 py-6 md:px-[60px] md:pt-10 md:pb-[26px]'>
          <div className='flex items-center md:gap-4 grow'>
            <h3 className='hidden md:block'>my chest</h3>
            <h4 className='block md:hidden'>my chest</h4>
            <div className='hidden md:block'>
              <Tag>{chest?.projects?.length} tracks</Tag>
            </div>
          </div>
          <div className='hidden md:flex items-center justify-center grow'>
            <SearchBar />
          </div>
          <div className='flex items-center justify-end gap-3 md:gap-4'>
            <div className='hidden md:flex flex-col items-end justify-center gap-1.5'>
              <div className='flex flex-row gap-1 text-sm font-archivo'>
                <span className='text-neutral-silver-100'>{format.bytes(chest.used_space)}</span>
                <span className='text-neutral-silver-300'>of</span>
                <span className='text-neutral-silver-100'>{format.bytes(chest.total_space)}</span>
              </div>
              <ProgressBar 
                progress={usedSpace}
                color='violet'
                size='150'
                direction='right'
                background='gray' />
            </div>
            <div className='text-brand-uva-light font-thunder text-4xl flex items-center justify-center'>
              {usedSpace}%
            </div>
            <div className='bg-neutral-silver-700 p-2 rounded-[10px]'>
              <img src={cloud} alt='' width={28} height={28} />
            </div>
          </div>
        </div>
        <div className='bg-neutral-black rounded-t-lg rounded-b-3xl pl-5 pr-4 pt-3 pb-8 md:px-[60px] md:pb-[60px] md:pt-10'>
          {
            chest?.projects?.length > 0 ?
              <TrackList tracks={chest.projects} /> :
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