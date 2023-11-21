import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import config from 'data/config.json';
import api from 'utils/api';

import Breadcrumb from 'components/Breadcrumb';
import VersionList from 'components/treasure/VersionList';
import ParticipantsTable from 'components/treasure/ParticipantsTable';
import AddButton from 'components/treasure/AddButton';
import Modal from 'components/Modal';
import Button from 'components/Button';
import UserSelector from 'components/treasure/UserSelector';
import LinksTable from 'components/treasure/LinksTable';
import AutoCompleteAlbum from 'components/AutoCompleteAlbum';

import { ReactComponent as Upload } from 'assets/images/icon-upload.svg';
import { ReactComponent as Plus } from 'assets/images/icon-plus.svg';
import { ReactComponent as Pencil } from 'assets/images/icon-pencil.svg';
import { ReactComponent as Trash } from 'assets/images/icon-trash.svg';
import { ReactComponent as Empty } from 'assets/images/empty-chest.svg';
import Input from 'components/Input';

export default function Treasure() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { chest } = useSelector((state) => state.auth.user);
  const { data } = useLoaderData();
  const { t } = useTranslation();

  const [project, setProject] = useState('');
  const [headers, setHeaders] = useState([]);
  const [permissionsView, setPermissionsView] = useState('');
  const [permissionsData, setPermissionsData] = useState('');
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');
  const [showEditParticipant, setShowEditParticipant] = useState('');
  const [showShareLink, setShowShareLink] = useState(false);
  const [showEditTrack, setShowEditTrack] = useState('');
  const [loading, setLoading] = useState(false);
  const [versionId, setVersionId] = useState('');
  const [album, setAlbum] = useState(project.album);
  const [trackName, setTrackName] = useState(project.name);
  const [showEditVersion, setShowEditVersion] = useState(false);

  const breadcrumb = [
    { name: 'My chest', link: '/my-chest' },
    { name: project.name, link: '' },
  ];

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
          <AddButton text='Add participant' onClick={() => { setShowAddParticipant(true) }} />
        )
      case 'links':
        return (
          <AddButton text='Share new link' onClick={() => { setShowShareLink(true) }} />
        )
      case 'users':
        return (
          <AddButton text='Share to user' />
        )
    }
  }

  const saveParticipant = async () => {
    setLoading(true);

    try {
      const participantData = {
        'project': data.id,
        'user': newParticipant.id,
        'role': newParticipant.role
      }

      const response = await api.post('project/participant/', participantData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setNewParticipant('');
    setShowAddParticipant(false);
  }

  const newShareLink = async () => {
    setLoading(true);

    const data = {
      'version': versionId,
      'allow_web_play': true
    }

    try {
      await api.post('shared/link/', data, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setShowShareLink(false);
    setVersionId('');
  }

  const saveEditTrack = async () => {
    setLoading(true);

    const data = {
      'album': album,
      'name': trackName
    }

    try {
      await api.patch(`project/${project.id}/`, data, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    } catch (error) {
      console.log(error)
    }

    setLoading(false);
    setShowEditTrack(false);
  }

  useEffect(() => {
    setProject(data);
    setPermissionsView(permissionsOptions[0]);
  }, [data]);

  useEffect(() => {
    switch (permissionsView) {
      case 'participants':
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
  }, [permissionsView])

  return (
    <>
      {project &&
        <div className='md:container flex flex-col gap-6 md:gap-10 py-8 md:py-[60px] px-3 md:px-0'>
          <div className='toolbar'>
            <Breadcrumb
              items={breadcrumb} />
            <div className='grow flex items-center justify-end gap-3'>
              <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
                <Upload width={28} height={28} />
              </button>
              <button type='button' className='p-2 rounded-full bg-neutral-silver-600'>
                <Plus width={28} height={28} />
              </button>
              <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={() => { setShowEditTrack(true); }}>
                <Pencil width={28} height={28} />
              </button>
              <button type='button' className='p-2 rounded-full bg-neutral-silver-600' onClick={() => { navigate(`trash/`) }}>
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
          <VersionList project={project} />
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
                {permissionsOptions.map(button => <TabButton title={button} />)}
              </div>
            </div>
            <div className='bg-neutral-black rounded-t-lg rounded-b-3xl pl-5 pr-4 pt-3 pb-8 md:px-[60px] md:pb-[60px] md:pt-10'>
              <AnimatePresence>
                {permissionsData.length > 0
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
      }
      <Modal show={showAddParticipant}>
        <div className='flex flex-col items-center text-center mb-[41px] max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>add participant</h4>
        </div>
        <UserSelector
          roles={config.roles}
          users={project.participants}
          selected={setNewParticipant} />
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => {
              setShowAddParticipant(false);
              setNewParticipant('');
            }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={loading || !newParticipant}
            loading={loading}
            onClick={saveParticipant} />
        </div>
      </Modal>
      <Modal show={showEditParticipant}>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => {
              setShowAddParticipant(false);
              setNewParticipant('');
            }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={loading || !newParticipant}
            loading={loading}
            onClick={saveParticipant} />
        </div>
      </Modal>
      <Modal show={showShareLink}>
        <div className='flex flex-col items-center text-center mb-4 max-w-[440px]'>
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
            disabled={loading || !versionId}
            loading={loading}
            onClick={newShareLink} />
        </div>
      </Modal>
      <Modal show={showEditTrack}>
        <div className='flex flex-col items-center text-center mb-4 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>edit track</h4>
        </div>
        <form className='flex flex-col gap-4'>
          <Input type='text' label='Track name' value={trackName} onChange={(e) => { setTrackName(e.target.value) }} required />
          <AutoCompleteAlbum
            searchValue={album}
            setSearchValue={setAlbum}
            options={chest?.albums ? chest.albums : []}
            label={t('upload.album')}
            placeholder={t('global.write_here')}
            helper={t('upload.leave_empty')} />
        </form>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowEditTrack(false) }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={loading}
            loading={loading}
            onClick={saveEditTrack} />
        </div>
      </Modal>
      <Modal show={showEditVersion}>
        
      </Modal>
    </>
  )
}