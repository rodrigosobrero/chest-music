import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'utils/helpers';

import { PencilIcon } from '@heroicons/react/24/solid';

export default function TrackCoverPreview({ onClick, cover, defaultCover }) {
  const { t } = useTranslation();

  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className='relative rounded-lg cursor-pointer w-full h-full'
        onMouseOver={() => { setHover(true) }}
        onMouseOut={() => { setHover(false) }}
        onClick={onClick}>
        <div className={classNames({
          'cover-preview transition-opacity duration-300 z-20': true,
          'opacity-100': hover,
          'opacity-0': !hover
        })}>
          <PencilIcon className='h-8 w-8 text-brand-gold' />
          <span className='font-semibold text-brand-gold'>{t('upload.edit_cover')}</span>
        </div>
        <div
          className='bg-neutral-silver-300 w-full h-full rounded-lg bg-no-repeat bg-center bg-cover'
          style={{ backgroundImage: `url("${cover ? cover : defaultCover.url}")` }}>
          <div 
            className={classNames({
              'absolute right-1.5 top-1.5 rounded bg-neutral-silver-400 p-1.5 transition-opacity duration-300': true,
              'opacity-0': hover,
              'opacity-100': !hover,
            })}>
            <PencilIcon className='h-5 w-5 text-white' />
          </div>
        </div>
      </div>
    </>
  )
}