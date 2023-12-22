import { format } from 'utils/helpers';
import { formatTime } from 'utils/helpers';
import { isDesktop } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { playing } from 'app/playlist';

import VersionsActionsButton from './VersionsActionsButton';

import { PlayIcon } from '@heroicons/react/24/solid';

export default function VersionsRow({ project, version }) {
  const dispatch = useDispatch();
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

  return (
    <>
      <td>
        <div className='flex flex-row gap-3 md:gap-4'>
          <div className='relative rounded flex items-center'>
            <button type='button' onClick={() => { dispatch(playing(version)) }}>
              <PlayIcon className="h-6 w-6 text-white" />
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
          <td>{formatTime(version.duration)}</td>
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