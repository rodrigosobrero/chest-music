import TrackListRow from 'components/TrackListRow';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import VersionListRow from './VersionListRow';

export default function VersionList({ project }) {
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
        'version',
        'plays',
        'date added',
        'length',
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
            project?.versions?.map((version, index) =>
              <VersionListRow 
                key={index} 
                project={project}
                version={version} 
                onClick={() => { dispatch(playing('')) }} />
            )
          }
        </tbody>
      </table>
    </>
  )
}