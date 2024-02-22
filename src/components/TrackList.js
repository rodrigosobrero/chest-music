import TrackListRow from 'components/TrackListRow';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function TrackList({ tracks, query }) {
  const [titles, setTitles] = useState([]);
  const [rowOpenned, setRowOpenned] = useState(false);
  
  const toggleOpen = (id) => {
    setRowOpenned(rowOpenned === id ? false : id);
  }

  const closeOptions = () => setRowOpenned(false);

  useEffect(() => {
    if (isMobile) {
      setTitles([
        'title',
        '',
      ])
    } else {
      setTitles([
        'title',
        'album',
        'version',
        'date added',
        'length',
        //'total size',
        '',
      ])
    }
  }, [])

  return (
    <>
      <table className='collapsed'>
        <thead>
          <tr>
            {
              titles.map((title, index) => 
                <th 
                  key={index} 
                  className={`${ !title && 'cursor-default' }`}>
                    {title}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
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
                            type={i !== 0 && 'version'}
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