import { format } from 'utils/helpers';
import { formatTime } from 'utils/helpers';
import { isDesktop } from 'react-device-detect';

import VersionsActionsButton from './VersionsActionsButton';

import { PlayIcon } from '@heroicons/react/24/solid';

export default function VersionsRow({ project, version }) {
  return (
    <>
      <tr>
        <td>
          <div className='flex flex-row gap-3 md:gap-4'>
            <div className='relative rounded flex items-center'>
              <button type='button'>
                <PlayIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div>
              <span className='text-lg line-clamp-1'>{project.name}</span>
              <div className='text-sm text-neutral-silver-200'>
                {project.participants?.map((participant, index) => (index ? ', ' : '') + participant.full_name)}
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
      </tr>
    </>
  )
}