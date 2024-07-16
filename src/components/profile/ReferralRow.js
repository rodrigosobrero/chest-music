import React from 'react';
import { timeDifference } from 'utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const ManageRow = ({ data, isMobile }) => {  
  const { t, i18n } = useTranslation();
  const lang = i18n.language.split('-')[0];
  const renderDesktopRow = () => (
    <tr className={!data.accepted && 'opacity-50'}>
      <td className='text-lg'>{data.full_name}</td>
      <td>@{data.username}</td>
      <td>{data.subscription.plan_info[lang].title}</td>
      <td>{timeDifference(data.subscription.date_started)}</td>
    </tr>
  );

  const renderMobileRow = () => (
    <tr>
      <td>
        <div>
          <div className='text-[16px]'>{data.full_name}</div>
          <div className='text-sm text-neutral-silver-200'>
            @{data.username} - {data.subscription.plan_info[lang].title}
          </div>
        </div>
      </td>
    </tr>
  );

  return <>{isMobile ? renderMobileRow() : renderDesktopRow()}</>;
};

export default ManageRow;