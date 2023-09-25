import TrackListRow from 'components/TrackListRow';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function TrackList({ tracks }) {
  const dispatch = useDispatch();
  const playlist = useSelector(state => state.playlist);

  const [titles, setTitles] = useState([]);

  const handleSortingChange = (index) => {
    console.log(index);
    console.log(playlist);
  }

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
        'total size',
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
                  onClick={() => { title && handleSortingChange(index) }} 
                  className={`${ !title && 'cursor-default' }`}>
                    {title}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            tracks.map((track, index) =>
              <TrackListRow key={index} track={track} onClick={() => { dispatch(playing(track)) }} />
            )
          }
        </tbody>
      </table>
    </>
  )
}