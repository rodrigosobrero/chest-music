import React from 'react';
import { timeDifference } from 'utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ManageRow = ({ data, isMobile }) => {  
  const renderDesktopRow = () => (
    <tr className={!data.accepted && 'opacity-50'}>
      <td className='text-lg'>{data.name}</td>
      <td>@{data.username}</td>
      <td>plan elegido</td>
      <td>{timeDifference(data.date_added)}</td>
    </tr>
  );

  const renderMobileRow = () => (
    <tr>
      <td>
        <div>
          <div className='text-[16px]'>{data.name}</div>
          <div className='text-sm text-neutral-silver-200'>
            @{data.username} - chosen plan
          </div>
        </div>
      </td>
    </tr>
  );

  return <>{isMobile ? renderMobileRow() : renderDesktopRow()}</>;
};

export default ManageRow;