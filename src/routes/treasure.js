import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useModal } from 'hooks/useModal';
import { useCreateLinkMutation, useGetProjectQuery } from 'store/api';

import Breadcrumb from 'components/Breadcrumb';
import VersionsTable from 'components/treasure/VersionsTable';
import ParticipantsTable from 'components/treasure/ParticipantsTable';
import AddButton from 'components/treasure/AddButton';
import Modal from 'components/Modal';
import Button from 'components/Button';
import LinksTable from 'components/treasure/LinksTable';

import { ReactComponent as Upload } from 'assets/images/icon-upload.svg';
import { ReactComponent as Plus } from 'assets/images/icon-plus.svg';
import { ReactComponent as Pencil } from 'assets/images/icon-pencil.svg';
import { ReactComponent as Trash } from 'assets/images/icon-trash.svg';
import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';

export default function Treasure() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { t } = useTranslation();

  const {
    data: project = [],
    isLoading,
    isFetching
  } = useGetProjectQuery(id);

  const [createLink, { isLoading: isLoadingCreateLink }] = useCreateLinkMutation();

  const { onOpen: openEditModal } = useModal('EditTrackModal');
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openAddParticipantModal } = useModal('AddParticipantModal');

  const [breadcrumb, setBreadcrums] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [permissionsView, setPermissionsView] = useState();
  const [permissionsData, setPermissionsData] = useState('');
  const [showShareLink, setShowShareLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [versionId, setVersionId] = useState('');
  const [showEditLink, setShowEditLink] = useState(false);

  const permissionsOptions = [
    'participants',
    'links',
    'users'
  ];

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

  const switchTable = (view) => {
    switch (view) {
      case 'participants':
        return (
          <>
            <ParticipantsTable
              data={permissionsData}
              headers={headers}
              user={user} />
          </>
        )
      case 'links':
        return (
          <>
            <LinksTable
              data={permissionsData}
              headers={headers}
              user={user} />
          </>
        )
      case 'users':
        return (
          <>
            <ParticipantsTable
              data={permissionsData}
              headers={headers}
              user={user} />
          </>
        )
    }
  }

  const switchAddButton = (view) => {
    switch (view) {
      case 'participants':
        return (
          <AddButton text='Add participant' onClick={() => { openAddParticipantModal({ project }) }} />
        )
      case 'links':
        return (
          <AddButton text='Share new link' onClick={() => { setShowShareLink(true) }} />
        )
      case 'users':
        return (
          <AddButton text='Share to user' onClick={() => { navigate(`/share/${project.id}?=sendDM`) }} />
        )
    }
  }

  const handleAddLink = async () => {
    const result = await createLink({
      'version': versionId,
      'allow_web_play': true
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      setVersionId('');
      setShowShareLink(false);
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

  useEffect(() => {
    setPermissionsView(permissionsOptions[0]);
    setBreadcrums([
      { name: 'My chest', link: '/my-chest' },
      { name: project?.name, link: '' },
    ]);
  }, [project]);

  useEffect(() => {
    switch (permissionsView) {
      case 'participants':
        console.log('permissions:', project.participants)
        setPermissionsData(project.participants);
        setHeaders([
          'Name',
          'Role',
          'Plays',
          'Date added',
          ''
        ]);
        break;
      case 'links':
        setPermissionsData(project.shared_versions.links);
        setHeaders([
          'Link',
          'Web Play',
          'Plays',
          'Date added',
          ''
        ]);
        break;
      case 'users':
        setPermissionsData(project.shared_versions.users);
        break;
    }
  }, [permissionsView]);

  if (isLoading || isFetching) {
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
            <AnimatePresence>
              {permissionsData?.length > 0
                ? <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}>
                  {switchTable(permissionsView)}
                </motion.span>
                : <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}>
                  <EmptyMessage />
                </motion.div>
              }
              <div className='flex flex-col items-center'>
                {switchAddButton(permissionsView)}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Modal show={showShareLink}>
        <div className='flex flex-col items-center text-center mb-8 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>choose version</h4>
          <p className='text-white text-lg'>
            Choose a version of this track to share
          </p>
        </div>
        <div className='version-options'>
          {
            project?.versions && (
              project.versions.map((version, index) =>
                <>
                  <div className='relative'>
                    <input
                      key={index}
                      type='radio'
                      id={version.id}
                      value={version.id}
                      name='plan'
                      onChange={(e) => { setVersionId(e.target.value) }} />
                    <label htmlFor={version.id}>
                      <span className='text-lg'>{version.name}</span>
                    </label>
                  </div>
                </>
              ))
          }
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowShareLink(false) }} />
          <Button
            text='Confirm'
            style='primary'
            disabled={isLoadingCreateLink || !versionId}
            loading={isLoadingCreateLink}
            onClick={handleAddLink} />
        </div>
      </Modal>
      <Modal show={showEditLink}>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => {  }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={loading}
            loading={loading} />
        </div>
      </Modal>
    </>
  )
}