import TrackListRow from 'components/TrackListRow';
import useSort from 'hooks/useSort';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TrackList({ tracks, query }) {
  const [titles, setTitles] = useState([]);
  const [rowOpenned, setRowOpenned] = useState(false);

  const { data, sortBy, method, tagOrdered} = useSort(tracks);

  const { t } = useTranslation()

  const toggleOpen = (id) => {
    setRowOpenned(rowOpenned === id ? false : id);
  }

  const closeOptions = () => setRowOpenned(false);


  useEffect(() => {
    if (isMobile) {
      setTitles([
        {
          title: t('tables.title'),
          tag: 'name'
        },
        '',
      ])
    } else {
      setTitles([
        { title: t('tables.title'), tag: 'name' },
        { title: t('tables.album'), tag: 'album' },
        { title: t('tables.version'), tag: 'version'},
        { title: t('tables.date_added'), tag: 'date_added' },
        { title: t('tables.length'), tag: 'size' },
        //'total size',
        '',
      ])
    }
  }, [t]);

  return (
    <>
      <table className='collapsed w-full'>
          <thead>
            <tr>
              {
                titles.map(({title, tag}, index) => 
                  <th 
                    onClick={() => sortBy(tag)}
                    key={index} 
                    className={`${ !title && 'cursor-default'} ${index === 0 && 'md:!pl-5'}`}>
                      <span className='flex items-center gap-2'>
                        {title} {tagOrdered === tag && (method === 'asc' ? <ChevronDownIcon className='h-4 w-4'/> : <ChevronUpIcon className='h-4 w-4'/> )}
                      </span>
                  </th>
                )
              }
            </tr>
          </thead>
        <tbody className='chest-rows'>
        {
            tracks?.length > 0 && data.map((track, index) => {
              if(query === '') {
                return (
                  <TrackListRow 
                  type={false}
                  key={index} 
                  track={track} 
                  version={track.versions[0]}
                  isOpened={rowOpenned === track.versions[0]?.id} 
                  toggleOptions={toggleOpen} 
                  closeOptions={closeOptions}/>                  
                )
              } else {
                return ( 
                     track.versions.map((version, i) => {
                      return (
                        <TrackListRow 
                            type={i === 0 ? 'project' : 'version'}
                            key={index} 
                            track={track} 
                            version={version}
                            isOpened={rowOpenned === version.id} 
                            toggleOptions={toggleOpen} 
                            closeOptions={closeOptions}/>
                      )}))}
            })
          }
        </tbody>
      </table>
    </>
  )
}