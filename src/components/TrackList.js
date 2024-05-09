import TrackListRow from 'components/TrackListRow';
import { useEffect, useState } from 'react';
import useSort from 'hooks/useSort';
import { useModal } from 'hooks/useModal';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SearchBar from './SearchBar';
import close from 'assets/images/icon-close.svg'
import search from 'assets/images/icon-search-white.svg'

export default function TrackList({ tracks, query, handleChange }) {
  const [titles, setTitles] = useState([]);
  const [rowOpenned, setRowOpenned] = useState(false);
                                                             
  const { t } = useTranslation();

  const { data, sortBy, method, tagOrdered, customOrderData } = useSort(tracks);
  const [isOpen, setIsOpen] = useState(false);
  const [titleOrdered, setTitleOrdered] = useState(t('tables.date_added'))

  const { onOpen } = useModal('SortTracksModal')

  const toggleOpen = (id) => {
    setRowOpenned(rowOpenned === id ? false : id);
  }

  const closeOptions = () => setRowOpenned(false);

  const orderData = (tag, type, title) => {
    customOrderData(tag, type); 
    setTitleOrdered(title);
    
  };
  useEffect(() => {
    if (isMobile) {
      setTitles([
        {
          title: titleOrdered,
          onClick: () => onOpen({ tagOrdered: tagOrdered, method: method, customOrderData: orderData })
        },
        { title: <img src={search} alt='search' onClick={() => setIsOpen(true)}/>
        },
      ])
    } else {
      setTitles([
        { title: t('tables.title'), tag: 'name' },
        { title: t('tables.album'), tag: 'album' },
        { title: t('tables.version'), tag: 'version'},
        { title: t('tables.date_added'), tag: 'date_added' },
        { title: t('tables.length'), tag: 'size' },
        '',
      ])
    }
  }, [t, tagOrdered, method, titleOrdered]);

  return (
    <>
      <table className='collapsed w-full'>
          <thead>
            <tr>
              {!isOpen ? 
                titles.map(({title, tag, onClick }, index) => 
                  <th 
                  onClick={() => { 
                    if (tag) {
                      sortBy(tag);
                    } else if (onClick) {
                      onClick();
                    } else {
                      console.log("No action specified");
                    }}}                    
                    key={index} 
                    className={`${ !title && 'cursor-default'} 
                                ${index === 0 && 'md:!pl-5'}`}>
                      <span className={`flex items-center gap-2 ${index === titles.length-1 && 'justify-end'}`}>
                        {title} {isMobile && index === 0 ?  (method === 'des' ? <ChevronUpIcon className='h-4 w-4'/> : <ChevronDownIcon className='h-4 w-4'/> ) : 
                        tagOrdered === tag && (method === 'des' ? <ChevronUpIcon className='h-4 w-4'/> : <ChevronDownIcon className='h-4 w-4'/> )}
                      </span>
                  </th>
                )
                :
                <>
                  <th className='w-full'>
                    <SearchBar placeholder={t('global.search_treasure')} onChange={handleChange}/>
                  </th>
                  <th>
                    <span className='flex justify-end'>
                      <img src={close} onClick={() => setIsOpen(false)} alt='close' />
                    </span>
                  </th>
                </>
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
                    closeOptions={closeOptions} />
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