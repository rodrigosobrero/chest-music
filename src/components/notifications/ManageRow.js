import React from 'react';
import { format } from 'utils/helpers';
import { XCircleIcon } from "@heroicons/react/24/outline";


const ManageRow = ({ data, isMobile, onDelete }) => {
  const renderDesktopRow = () => (
    <tr>
      <td>{data?.name}</td>
      <td>@{data.username}</td>
      <td className='md:flex hidden'>{format.date(data.date)}</td>
      <td>
        <button className='flex items-center' onClick={() => onDelete(data.id)}>
          <XCircleIcon className="h-6 w-6 text-white" />
        </button>
      </td>
    </tr>
  );

  const renderMobileRow = () => (
    <tr className='flex justify-between items-center'>
      <td>
        <div>
          <div className='text-lg'>{data.name}</div>
          <div className='text-sm text-neutral-silver-200'>
            @{data.username}
          </div>
        </div>
      </td>
      <td className=' '>
        <button className='flex ' onClick={() => onDelete(data.id)}>
         <XCircleIcon className="h-5 w-5 text-white" />
        </button>
      </td>
    </tr>
  );

  return <>{isMobile ? renderMobileRow() : renderDesktopRow()}</>;
};

export default ManageRow;