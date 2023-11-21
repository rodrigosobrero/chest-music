import { useLoaderData } from 'react-router-dom';
import Breadcrumb from 'components/Breadcrumb';
import TrashCanTable from "components/treasure/TrashCanTable";

import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';

export default function Trash() {
  const { data } = useLoaderData();

  const breadcrumb = [
    { name: 'My chest', link: '/my-chest' },
    { name: 'Test', link: '/my-chest/' },
    { name: 'Trash can', link: '' },
  ];

  const headers = [
    'Title',
    'Version',
    'Date moved',
    'Days remeaning',
    ''
  ];

  return (
    <>
      <div className='md:container flex flex-col gap-6 md:gap-10 py-8 md:py-[60px] px-3 md:px-0'>
        <div className='flex flex-col gap-4'>
          <Breadcrumb items={breadcrumb} />
          <h2 className='text-[64px] md:text-[76px]'>trash can</h2>
        </div>
        {data.length > 0
          ? <TrashCanTable headers={headers} data={data} />
          : (
            <div className='flex flex-col items-center'>
              <span className='text-[28px] font-semibold mb-2'>Nothing here</span>
              <Empty width={240} height={128} className='mb-5' />
            </div>
          )
        }
      </div>
    </>
  )
}