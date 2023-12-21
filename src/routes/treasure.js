import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { useGetProjectQuery } from 'store/api';

import Breadcrumb from 'components/Breadcrumb';
import VersionsTable from 'components/treasure/VersionsTable';
import ParticipantsTable from 'components/treasure/ParticipantsTable';
import AddButton from 'components/treasure/AddButton';

import { ReactComponent as Upload } from 'assets/images/icon-upload.svg';
import { ReactComponent as Plus } from 'assets/images/icon-plus.svg';
import { ReactComponent as Pencil } from 'assets/images/icon-pencil.svg';
import { ReactComponent as Trash } from 'assets/images/icon-trash.svg';
import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';
import LinksTable from 'components/treasure/LinksTable';

export default function Treasure() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const { data: project = {}, isLoading } = useGetProjectQuery(id);
  const { onOpen: openEditModal } = useModal('EditTrackModal');
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openAddParticipantModal } = useModal('AddParticipantModal');
  const { onOpen: openShareLinkModal } = useModal('ShareLinkModal');

  const permissionsOptions = [
    'participants',
    'links',
    'users'
  ];

  const [breadcrumb, setBreadcrums] = useState([]);
  const [permissionsView, setPermissionsView] = useState(permissionsOptions[0]);

  const TabButton = ({ title }) => {
    return (
      <>
        <button
          type='button'
          className={`button-tab ${permissionsView === title && 'active'}`}
          disabled={permissionsView === title}
          onClick={() => { setPermissionsView(title) }}>
          {title}
        </button>
      </>
    )
  }

  const EmptyMessage = () => {
    return (
      <>
        <div className='flex flex-col items-center'>
          <span className='text-[28px] font-semibold mb-2'>Nothing here</span>
          <span className='text-lg text-neutral-silver-200 mb-10'>
            Add users to access your track below
          </span>
          <Empty width={240} height={128} className='mb-5' />
        </div>
      </>
    )
  }

  const switchAddButton = (view) => {
    switch (view) {
      case 'participants':
        return (
          <AddButton text='Add participant' onClick={() => { openAddParticipantModal({ project }) }} />
        )
      case 'links':
        return (
          <AddButton text='Share new link' onClick={() => { openShareLinkModal({ project }) }} />
        )
      case 'users':
        return (
          <AddButton text='Share to user' onClick={() => { navigate(`/share/${project.id}?=sendDM`) }} />
        )
    }
  }

  const handleUpdateProject = () => {
    const meta = {
      id: project.id,
      name: project.name,
      album: project.album
    }

    openEditModal(meta);
  }

  const handleCreateVersion = () => {
    const meta = {
      name: project.name,
      participants: project.participants
    }

    openUploadModal(meta);
  }

  const renderView = () => {
    switch (permissionsView) {
      case 'participants':
        return (
          <>
            {project.participants.length > 0
              ? <div>
                <ParticipantsTable
                  data={project.participants}
                  headers={[
                    'Name',
                    'Role',
                    'Plays',
                    'Date added',
                    ''
                  ]}
                  user={user} />
              </div>
              : <EmptyMessage />
            }
            <div className='flex flex-col items-center'>
              {switchAddButton(permissionsView)}
            </div>
          </>
        )
      case 'links':
        return (
          <>
            {project.shared_versions.links.length > 0
              ? <div>
                <LinksTable
                  data={project.shared_versions.links}
                  headers={[
                    'Link',
                    'Web Play',
                    'Plays',
                    'Date added',
                    ''
                  ]}
                  user={user} />
              </div>
              : <EmptyMessage />}
            <div className='flex flex-col items-center'>
              {switchAddButton(permissionsView)}
            </div>
          </>
        )
      case 'users':
        return (
          <>
            {project.shared_versions.users.length > 0
              ? <div>
                <LinksTable
                  data={project.shared_versions.users}
                  headers={[
                    'Link',
                    'Web Play',
                    'Plays',
                    'Date added',
                    ''
                  ]}
                  user={user} />
              </div>
              : <EmptyMessage />}
            <div className='flex flex-col items-center'>
              {switchAddButton(permissionsView)}
            </div>
          </>
        )
    }
  }

  useEffect(() => {
    setBreadcrums([
      { name: 'My chest', link: '/my-chest' },
      { name: project?.name, link: '' },
    ]);
  }, [project]);

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <div className='container flex flex-col gap-6 md:gap-10 py-8 md:py-10'>
        <div className='toolbar'>
          <Breadcrumb items={breadcrumb} />
          <div className='grow flex items-center justify-end gap-3'>
            <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={() => { navigate(`/share/${project.id}?=sendDM`) }}>
              <Upload width={28} height={28} />
            </button>
            <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={handleCreateVersion}>
              <Plus width={28} height={28} />
            </button>
            <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={handleUpdateProject}>
              <Pencil width={28} height={28} />
            </button>
            <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={() => { navigate(`/my-chest/treasure/${project.id}/trash/`) }}>
              <Trash width={28} height={28} />
            </button>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center gap-12'>
          <div className='w-[220px] h-[220px]'>
            <img src={project.cover_url} alt='' width={220} height={220} className='rounded-lg h-full w-full' />
          </div>
          <div className='grow mb-3'>
            <div className='uppercase text-neutral-silver-200 mb-6'>{project.album} ― {project.plays ? project.plays : 0} plays</div>
            <h2 className='mb-3 text-[76px]'>{project.name}</h2>
            <div className='text-[22px]'>
              {project.participants?.map((participant, index) => (index ? ', ' : '') + participant.full_name)}
            </div>
          </div>
        </div>
        <VersionsTable project={project} />
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-2 bg-neutral-black rounded-t-3xl rounded-b-lg px-5 pt-6 md:px-[60px] md:pt-10'>
            <div className='flex w-full'>
              <div className='flex items-center md:gap-4 grow'>
                <h3 className='hidden md:block text-5xl'>permissions</h3>
                <h4 className='block md:hidden'>permissions</h4>
              </div>
              <div className='flex items-center gap-8'>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.participants.length}</span>
                  <span className='text-lg text-neutral-silver-200'>Participants</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.links && 0}</span>
                  <span className='text-lg text-neutral-silver-200'>Links</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.users && 0}</span>
                  <span className='text-lg text-neutral-silver-200'>Users</span>
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-6'>
              {permissionsOptions.map((button, index) => <TabButton key={index} title={button} />)}
            </div>
          </div>
          <div className='bg-neutral-black rounded-t-lg rounded-b-3xl pl-5 pr-4 pt-3 pb-8 md:px-[60px] md:pb-[60px] md:pt-10'>
            {renderView()}
          </div>
        </div>
      </div>
    </>
  )
}