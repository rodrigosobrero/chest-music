import { useParams } from 'react-router-dom';
import { useGetTrashQuery, useGetProjectQuery } from 'store/api';

import Breadcrumb from 'components/Breadcrumb';
import TrashCanTable from 'components/treasure/TrashCanTable';

import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';

export default function Trash() {
  const { id } = useParams();

  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetTrashQuery(id);

  const {
    data: project = {},
  } = useGetProjectQuery(id);

  const breadcrumb = [
    { name: 'My chest', link: '/my-chest' },
    { name: project.name, link: `/my-chest/treasure/${project.id}` },
    { name: 'Trash can', link: '' }
  ];

  if (isLoading || isFetching) {
    return (
      <>
        <div className='flex flex-col gap-1 animate-pulse'>
          <div className='bg-neutral-black rounded-t-3xl rounded-b-lg h-[124px]'></div>
          <div className='bg-neutral-black rounded-t-lg rounded-b-3xl h-[300px]'></div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='container flex flex-col gap-6 md:gap-10 py-8 lg:py-[40px]'>
        <div className='flex flex-col gap-4'>
          <Breadcrumb items={breadcrumb} />
          <h2 className='text-[64px] md:text-[76px]'>trash can</h2>
        </div>
        {data.length > 0
          ? <TrashCanTable data={data} />
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