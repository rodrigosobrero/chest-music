import { useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { useGetProjectQuery, useGetChestQuery } from 'store/api';
import { classNames } from 'utils/helpers';
import { isDesktop, isMobile } from 'react-device-detect';

import Breadcrumb from 'components/Breadcrumb';
import VersionsTable from 'components/treasure/VersionsTable';
import ParticipantsTable from 'components/treasure/ParticipantsTable';
import LinksTable from 'components/treasure/LinksTable';
import UsersTable from 'components/treasure/UsersTable';
import AddButton from 'components/treasure/AddButton';

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';
import TrackCoverPreview from 'components/TrackCoverPreview';

export default function Treasure() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const { data: chest = {}, isLoading: isLoadingChest } = useGetChestQuery();
  const { data: project = {}, isLoading, error } = useGetProjectQuery(id, {
    refetchOnMountOrArgChange: true
  });

  const { onOpen: openEditModal } = useModal('EditTrackModal');
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openAddParticipantModal } = useModal('AddParticipantModal');
  const { onOpen: openShareLinkModal } = useModal('ShareLinkModal');
  const { onOpen: openCoverSelector } = useModal('CoverSelectorModal');

  const permissionsOptions = [
    'participants',
    'links',
    'users'
  ];

  const [breadcrumb, setBreadcrums] = useState([]);
  const [permissionsView, setPermissionsView] = useState(permissionsOptions[0]);
  const [defaultCover, setDefaultCover] = useState('');
  const [covers, setCovers] = useState([]);

  const TabButton = ({ title }) => {
    return (
      <>
        <button
          type='button'
          className={classNames({
            'button-tab': true,
            'active': permissionsView === title
          })}
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
      participants: project.participants,
      project: project.id
    }

    openUploadModal(meta);
  }

  const handleEditCover = () => {
    openCoverSelector({
      project,
      user,
      covers
    });
  }

  const renderView = () => {
    let data, headers;

    switch (permissionsView) {
      case 'participants':
        data = project.participants;
        if (isMobile) {
          headers = ['Name', ''];
        } else {
          headers = ['Name', 'Role', 'Plays', 'Date added', ''];
        }
        break;

      case 'links':
        data = project.shared_versions.links;
        if (isMobile) {
          headers = ['Link', '', ''];
        } else {
          headers = ['Link', 'Web Play', 'Plays', 'Date added', ''];
        }
        break;

      case 'users':
        data = project.shared_versions.users;
        if (isMobile) {
          headers = ['Name', '', ''];
        } else {
          headers = ['Name', 'Version shared', 'Web play', 'Plays', 'Date shared', ''];
        }
        break;

      default:
        return null;
    }

    return (
      <>
        {data.length > 0 ? (
          <div>
            {permissionsView === 'participants' ? (
              <ParticipantsTable data={data} headers={headers} user={user} />
            ) : permissionsView === 'links' ? (
              <LinksTable data={data} headers={headers} />
            ) : (
              <UsersTable data={data} headers={headers} />
            )}
          </div>
        ) : (
          <EmptyMessage />
        )}
        <div className='flex flex-col items-center'>
          {switchAddButton(permissionsView)}
        </div>
      </>
    );
  };

  useEffect(() => {
    if (chest && chest.covers) {
      setDefaultCover(chest.covers.find(cover => cover.default));

      let filtered = chest.covers.filter(cover => !cover.default);

      filtered.map(cover => {
        filtered.push(cover);
      });

      setCovers(filtered);
    }
  }, [chest]);

  useEffect(() => {
    setBreadcrums([
      { name: 'My chest', link: '/my-chest' },
      { name: project?.name, link: '' },
    ]);
  }, [project]);

  if (isLoading) {
    return 'Loading...'
  }

  if (error) {
    return (
      <Navigate to='/my-chest/' replace={true} />
    )
  }

  return (
    <>
      <div className='container flex flex-col gap-6 md:gap-10 py-8 md:py-10'>
        <div className='toolbar'>
          <div className='grow'>
            <Breadcrumb items={breadcrumb} minify />
          </div>
          <div className='lg:fixed max-w-screen-2xl flex items-center justify-end gap-3 lg:w-full'>
            <button
              type='button'
              className='toolbar-button primary'
              onClick={() => { navigate(`/share/${project.id}?=sendDM`) }}>
              <ArrowUpTrayIcon className='h-7 w-7' />
            </button>
            <button
              type='button'
              className='toolbar-button primary'
              onClick={handleCreateVersion}
              style={{ color: 'blue' }}>
              <PlusIcon className='h-7 w-7' />
            </button>
            {isDesktop && (
              <>
                <button
                  type='button'
                  className='toolbar-button primary'
                  onClick={handleUpdateProject}>
                  <PencilSquareIcon className='h-7 w-7' />
                </button>
                <button
                  type='button'
                  className='toolbar-button alert'
                  onClick={() => { navigate(`/my-chest/treasure/${project?.id}/trash/`) }}>
                  <TrashIcon className='h-7 w-7' />
                </button>
              </>
            )}
          </div>
        </div>
        <div className='flex flex-col lg:flex-row lg:items-center justify-center gap-4 lg:gap-12'>
          <div className='w-[100px] h-[100px] lg:w-[220px] lg:h-[220px]'>
            <TrackCoverPreview
              cover={project.cover_url}
              defaultCover={defaultCover}
              onClick={handleEditCover}
            />
          </div>
          <div className='grow mb-3'>
            <div className='uppercase text-neutral-silver-200 mb-4 lg:mb-6'>{project.album} ― {project.plays ? project.plays : 0} plays</div>
            <h2 className='lg:mb-3 text-[64px] lg:text-[76px] text-left'>{project.name}</h2>
            <div className=' text-lg lg:text-[22px]'>
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
              <div className='hidden lg:flex items-center gap-8'>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.participants.length}</span>
                  <span className='text-lg text-neutral-silver-200'>Participants</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.links.length}</span>
                  <span className='text-lg text-neutral-silver-200'>Links</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.users.length}</span>
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