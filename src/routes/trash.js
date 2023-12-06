import { useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from 'utils/api';

import Breadcrumb from 'components/Breadcrumb';
import TrashCanTable from 'components/treasure/TrashCanTable';
import Modal from 'components/Modal';

import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';
import { useEffect, useState } from 'react';

export default function Trash() {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [project, setProject] = useState('');

  const breadcrumb = [
    { name: 'My chest', link: '/my-chest' },
    { name: project.name, link: `/my-chest/treasure/${project.id}` },
    { name: 'Trash can', link: '' }
  ];

  const getProject = async () => {
    try {
      const response = await api.get(`project/${id}/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?.token) return

    getProject();
  }, [user]);

  return (
    <>
      <div className='md:container flex flex-col gap-6 md:gap-10 py-8 md:py-[60px] px-3 md:px-0'>
        <div className='flex flex-col gap-4'>
          <Breadcrumb items={breadcrumb} />
          <h2 className='text-[64px] md:text-[76px]'>trash can</h2>
        </div>
        {project.length > 0
          ? <TrashCanTable data={project} />
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