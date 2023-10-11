import React from 'react';
import { timeDifference } from 'utils/helpers';

const ManageRow = ({ data, isMobile }) => {
  const renderDesktopRow = () => (
    <tr>
      <td>{data.name}</td>
      <td>@{data.username}</td>
      <td className='md:flex hidden'>{timeDifference(data.date)}</td>
      <td>X</td>
    </tr>
  );

  const renderMobileRow = () => (
    <tr>
      <td>
        <div>
          <div className='text-lg'>{data.name}</div>
          <div className='text-sm text-neutral-silver-200'>
            @{data.username}
          </div>
        </div>
      </td>
      <td>X</td>
    </tr>
  );

  return <>{isMobile ? renderMobileRow() : renderDesktopRow()}</>;
};

export default ManageRow;