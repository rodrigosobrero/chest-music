import { useGetChestQuery } from 'store/api';

import Tag from 'components/Tag';
import TrackList from 'components/TrackList';
import SearchBar from 'components/SearchBar';
import StorageIndicator from 'components/StorageIndicator';

import empty from 'assets/images/empty-chest.svg';

export default function Chest() {
  const {
    data: chest = [],
    isLoading,
    isFetching,
  } = useGetChestQuery('', { refetchOnMountOrArgChange: true });

  if (isLoading || isFetching) {
    return (
      <>
        <div className='flex flex-col gap-1 animate-pulse'>
          <div className='bg-black rounded-t-3xl rounded-b-lg h-[124px]'></div>
          <div className='bg-black rounded-t-lg rounded-b-3xl h-[300px]'></div>
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
          <StorageIndicator usedSpace={chest.used_space} totalSpace={chest.total_space} />
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