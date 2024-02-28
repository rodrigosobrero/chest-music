import TrackListRow from 'components/TrackListRow';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

export default function TrackList({ tracks, query }) {
  const [titles, setTitles] = useState([]);
  const [rowOpenned, setRowOpenned] = useState(false);

  const { t } = useTranslation()

  const toggleOpen = (id) => {
    setRowOpenned(rowOpenned === id ? false : id);
  }

  const closeOptions = () => setRowOpenned(false);

  useEffect(() => {
    if (isMobile) {
      setTitles([
        t('tables.title'),
        '',
      ])
    } else {
      setTitles([
        t('tables.title'),
        t('tables.album'),
        t('tables.version'),
        t('tables.date_added'),
        t('tables.length'),
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
                titles.map((title, index) => 
                  <th 
                    key={index} 
                    className={`${ !title && 'cursor-default'} ${index === 0 && '!pl-5'}`}>
                      {title}
                  </th>
                )
              }
            </tr>
          </thead>
        <tbody className='chest-rows'>
        {
            tracks.map((track, index) => {
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