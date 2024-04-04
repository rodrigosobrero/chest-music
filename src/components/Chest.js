import { useMemo, useState } from 'react';
import { useGetChestQuery } from 'store/api';
import { filter } from 'utils/helpers';
import Tag from 'components/Tag';
import TrackList from 'components/TrackList';
import SearchBar from 'components/SearchBar';
import StorageIndicator from 'components/StorageIndicator';
import empty from 'assets/images/empty-chest.svg';
import { useTranslation } from 'react-i18next';

export default function Chest() {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const {
    data: chest = {},
    isLoading,
    isFetching,
  } = useGetChestQuery({}, { refetchOnMountOrArgChange: true });

  const filteredProjects = useMemo(() => {
    return filter(chest.projects || [], query);
  }, [chest.projects, query]);

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  }

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
            <h3 className='hidden md:block'>{t('global.my chest')}</h3>
            <h4 className='block md:hidden'>{t('global.my chest')}</h4>
            <div className='hidden md:block'>
              <Tag>{chest?.projects?.length} tracks</Tag>
            </div>
          </div>
          <div className='hidden md:flex items-center justify-center grow'>
            <SearchBar onChange={handleOnChange} placeholder={t('global.search_treasure')}/>
          </div>
          <StorageIndicator usedSpace={chest.used_seconds} totalSpace={chest.total_seconds} />
        </div>
        <div className='bg-neutral-black rounded-t-lg rounded-b-3xl pl-5 pr-4 pt-3 pb-8 md:px-[45px] md:pb-[60px] md:pt-10'>
          {
            filteredProjects.length > 0 || query !== ''  ?
              <TrackList tracks={filteredProjects} query={query} handleChange={handleOnChange} /> :
              <div className='flex flex-col items-center gap-2 pt-7 -pl-1 pb-2'>
                <h4 className='empty-title'>Your chest is empty</h4>
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