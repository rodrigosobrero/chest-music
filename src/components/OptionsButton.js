import React from 'react';

import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    EyeIcon,
    PencilSquareIcon,
    PlusIcon,
    XCircleIcon
  } from '@heroicons/react/24/outline';

const OptionsButton = ({ type, title, onClick }) => {

  const Icon = ({ type }) => {
    let icon;
    
    switch (type) {
        case 'add':
            icon = <PlusIcon className='h-6 w-6 text-brand-gold' />
            break;
        case 'detail':
            icon = <EyeIcon className='h-6 w-6 text-brand-gold' />
            break;
        case 'share':
            icon = <ArrowUpTrayIcon className='h-6 w-6 text-brand-gold' />;
            break;
        case 'download':
            icon = <ArrowDownTrayIcon className='h-6 w-6 text-brand-gold' />;
            break;
        case 'edit':
            icon = <PencilSquareIcon className='h-6 w-6 text-brand-gold' />;
            break;
        case 'delete':
            icon = <XCircleIcon className='h-6 w-6 text-error-red' />;
            break;
    }    
    return icon;
    }

  return (
    <button className='w-full bg-neutral-silver-600 flex items-center py-3 px-4 gap-2.5 rounded-xl' onClick={onClick}>
        <Icon type={type} />
        {title}
    </button>
  )
}

export default OptionsButton;