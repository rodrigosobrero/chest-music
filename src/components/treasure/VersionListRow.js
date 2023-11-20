import { useState } from 'react';
import { formatDate } from 'utils/helpers';
import { formatTime, bytesToSize } from 'utils/helpers';
import { isMobile, isDesktop } from 'react-device-detect';

import TrackListOptions from 'components/TrackListOptions';

import { PlayIcon } from '@heroicons/react/24/solid';
import upload from 'assets/images/icon-upload.svg';

export default function VersionListRow({ project, version, onClick }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <tr
        onMouseEnter={() => { setShow(true) }}
        onMouseOut={() => { setShow(false) }}
        onClick={onClick}>
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
                {formatDate(version.date_added)}
              </span>
            </td>
            <td>{formatTime(version.duration)}</td>
          </>
        )}
        <td>
          <div className='flex justify-end'>
            <TrackListOptions id={version.id} />
          </div>
        </td>
      </tr>
    </>
  )
}