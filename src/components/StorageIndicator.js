import { classNames } from 'utils/helpers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import { formatHours } from 'utils/helpers';
import { CloudIcon } from '@heroicons/react/24/outline';

export default function StorageIndicator({ usedSpace, totalSpace, reverse, upgrade = true }) {
  const [percentageUsed, setPercentageUsed] = useState(0);
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(prev => !prev);
  }

  const setColor = (active, percentageUsed) => {
    if (active) return 'orange'
    if (percentageUsed >= 95) return 'red'
    if (percentageUsed < 95) return 'violet'
  }

  useEffect(() => {
    setPercentageUsed(Math.round(100 * usedSpace / totalSpace));
  }, [usedSpace, totalSpace]);

  return (
    <>
      <div className='storage-indicator' onMouseOver={toggleActive} onMouseOut={toggleActive}>
        <div
          className={classNames({
            'hidden md:flex flex-col justify-center gap-1.5': true,
            'items-end': !reverse,
            'order-last': reverse
          })}>
          <div className={classNames({
            'flex flex-row gap-1 text-sm font-archivo': true,
            'justify-start': reverse
          })}>
            <span className='text-neutral-silver-100'>{formatHours(usedSpace)}</span>
            <span className='text-neutral-silver-300'>of</span>
            <span className='text-neutral-silver-100'>{formatHours(totalSpace, 0)}</span>
          </div>
          <ProgressBar
            progress={percentageUsed}
            color={setColor(active, percentageUsed)}
            size='responsive'
            direction='right'
            background='gray' />
        </div>
        <div className={classNames({
          'font-thunder text-4xl flex items-center justify-center transition duration-300 ': true,
          'text-error-red': !active && percentageUsed >= 95,
          'text-brand-uva-light': !active && percentageUsed < 95,
          'text-brand-gold': active,
          'order-first': reverse
        })}>
          <span className='font-thunder'>
            {percentageUsed}%
          </span>
        </div>
        {upgrade && (
          <Link className='bg-neutral-silver-700 p-2 rounded-[10px]' to={'/profile/account'}>
            <CloudIcon className={classNames({
              'h-7 w-7 transition duration-300': true,
              'text-error-red': !active && percentageUsed >= 95,
              'text-brand-uva': !active && percentageUsed < 95,
              'text-brand-gold': active,
            })} />
          </Link>
        )}
      </div>
    </>
  )
}