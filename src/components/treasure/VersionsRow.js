import { useDispatch, useSelector } from 'react-redux';
import { isDesktop } from 'react-device-detect';
import { format } from 'utils/helpers';
import { playing } from 'app/playlist';

import VersionsActionsButton from './VersionsActionsButton';

import { PlayIcon } from '@heroicons/react/24/solid';
import { PauseIcon } from '@heroicons/react/24/solid';

export default function VersionsRow({ project, version }) {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  const filteredParticipants = (participants) => {
    let filtered = [];

    participants.map((participant) => {
      if (participant.accepted && participant.role !== 'listener') {
        filtered.push(participant.full_name)
      }
    });

    if (filtered.length > 0) {
      return filtered.map((participant, index) => (
        (index ? ', ' : '') + participant)
      )
    }
  }

  const handleOnClick = () => {
    dispatch(playing({
      id: version.id,
      album: project.album,
      cover: project.cover_url,
      name: project.name,
      authors: project.participants.map(participant => participant.full_name),
      type: 'version',
      isPlaying: false
    }));
  }

  return (
    <>
      <td>
        <div className='flex flex-row gap-3 md:gap-4'>
          <div className='relative rounded flex items-center'>
            <button type='button' onClick={handleOnClick}>
              {playlist[0]?.id === version.id && playlist[0]?.type === 'version' && playlist[0].isPlaying
              ? <PauseIcon className='h-6 w-6 text-gray-500' />
              : <PlayIcon className='h-6 w-6 text-white' />}
            </button>
          </div>
          <div>
            <span className='text-lg line-clamp-1'>{project.name}</span>
            <div className='text-sm text-neutral-silver-200'>
              {filteredParticipants(project.participants)}
            </div>
          </div>
        </div>
      </td>
      {isDesktop && (
        <>
          <td>{version.name}</td>
          <td>{version.plays ? version.plays : 0}</td>
          <td>
            <span className='capitalize'>
              {format.date(version.date_added)}
            </span>
          </td>
          <td>{format.time(version.duration)}</td>
        </>
      )}
      <td>
        <div className='flex justify-end'>
          <VersionsActionsButton version={version} />
        </div>
      </td>
    </>
  )
}