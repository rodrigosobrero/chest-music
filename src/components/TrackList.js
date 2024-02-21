import TrackListRow from 'components/TrackListRow';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function TrackList({ tracks }) {
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
      <table>
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
              return (
                  track.versions.map((version) => {
                    return (
                      <TrackListRow 
                          key={index} 
                          track={track} 
                          version={version}
                          // version_duration={version.duration}
                          // version_id={version.id} 
                          // version_name={version.name}
                          isOpened={rowOpenned === track.id} 
                          toggleOptions={toggleOpen} 
                          closeOptions={closeOptions}/>
                    )})
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}