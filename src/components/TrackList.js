import TrackListRow from 'components/TrackListRow';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';

export default function TrackList({ tracks }) {
  const dispatch = useDispatch();
  const playlist = useSelector(state => state.playlist);
  const titles = [
    'title',
    'album',
    'version',
    'date added',
    'length',
    'total size',
    '',
  ];
  const handleSortingChange = (index) => {
    console.log(index);
    console.log(playlist);
  }

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