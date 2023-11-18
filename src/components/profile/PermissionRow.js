import React from 'react';
import { timeDifference } from 'utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ManageRow = ({ data, isMobile, deleteListener }) => {  
  const renderDesktopRow = () => (
    <tr className={!data.accepted && 'opacity-50'}>
      <td className='text-lg'>{data.name}</td>
      <td>@{data.username}</td>
      <td>{data.plays}</td>
      <td>{timeDifference(data.date_added)}</td>
      <td>
        <button className='p-2.5 ' onClick={() => deleteListener(data.id)}>
           <XMarkIcon className='h-6 w-6 text-white' />
        </button>
      </td>
    </tr>
  );

  const renderMobileRow = () => (
    <tr>
      <td>
        <div>
          <div className='text-[16px]'>{data.name}</div>
          <div className='text-sm text-neutral-silver-200'>
            @{data.username} - {data.plays} plays
          </div>
        </div>
      </td>
      <td >
        <div className='justify-end flex w-full'>
         <button onClick={() => deleteListener(data.id)}>
            <XMarkIcon className='h-5 w-5 text-white' />
          </button>
        </div>
      </td>
    </tr>
  );

  return <>{isMobile ? renderMobileRow() : renderDesktopRow()}</>;
};

export default ManageRow;