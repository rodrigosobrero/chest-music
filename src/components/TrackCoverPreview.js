import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PencilIcon } from '@heroicons/react/24/solid';
import key from 'assets/images/icon-key.svg';

export default function TrackCoverPreview({ onClick, cover }) {
  const { t } = useTranslation();

  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className='relative rounded-lg cursor-pointer'
        onMouseOver={() => { setHover(true) }}
        onMouseOut={() => { setHover(false) }}
        onClick={onClick}>
        <div className={`cover-preview transition-opacity duration-300 z-20 ${hover ? 'opacity-100' : 'opacity-0'}`}>
          <PencilIcon className='h-8 w-8 text-brand-gold' />
          <span className='font-semibold text-brand-gold'>{t('upload.edit_cover')}</span>
        </div>
        <div
          className={`bg-neutral-silver-300 w-[140px] md:w-[200px] h-[140px] md:h-[200px] rounded-lg bg-no-repeat bg-center ${cover && 'bg-cover'}`}
          style={{ backgroundImage: `url("${cover ? cover : key}")` }}>
          <div className={`absolute right-1.5 top-1.5 rounded bg-neutral-silver-400 p-1.5 transition-opacity duration-300 ${hover ? 'opacity-0' : 'opacity-100'}`}>
            <PencilIcon className='h-5 w-5 text-white' />
          </div>
        </div>
      </div>
    </>
  )
}