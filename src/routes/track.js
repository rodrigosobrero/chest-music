import Breadcrumb from 'components/Breadcrumb';
import TrackList from 'components/TrackList';

import { ReactComponent as Upload } from 'assets/images/icon-upload.svg';
import { ReactComponent as Plus } from 'assets/images/icon-plus.svg';
import { ReactComponent as Pencil } from 'assets/images/icon-pencil.svg';
import { ReactComponent as Trash } from 'assets/images/icon-trash.svg';

import tracks from 'data/tracks.json';
import track from 'data/track.json';

export default function Track() {
  const breadcrumbItems = [
    { name: 'My chest', link: '/my-chest' },
    { name: track.title, link: '' },
  ];

  return (
    <>
      <div className='toolbar'>
        <Breadcrumb items={breadcrumbItems}/>
        <div className='grow flex items-center justify-end gap-3'>
          <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
            <Upload width={28} height={28} />
          </button>
          <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
            <Plus width={28} height={28} />
          </button>
          <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
            <Pencil width={28} height={28} />
          </button>
          <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
            <Trash width={28} height={28} />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center gap-12 mb-10'>
        <div className=''>
          <img src={track.cover} alt='' width={220} height={220} className='rounded-lg' />
        </div>
        <div className='grow mb-3'>
          <div className='uppercase text-neutral-silver-200 mb-6'>{track.album} - {track.plays} plays</div>
          <h2 className='mb-3 text-[76px]'>{track.title}</h2>
          <div className='text-[22px]'>{track.author.join(', ')}</div>
        </div>
      </div>
      <TrackList tracks={tracks} />
    </>
  )
}