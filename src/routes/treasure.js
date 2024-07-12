import { useEffect, useState } from 'react';
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation() 
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
  const [suspended, setSuspended] = useState(false);

  const [hoverShare, setHoverShare] = useState(false);
  const [hoverAdd, setHoverAdd] = useState(false);
  const [hoverTrash, setHoverTrash] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);

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
          {t(`global.${title}`)}
        </button>
      </>
    )
  }

  const EmptyMessage = () => {
    return (
      <>
        <div className='flex flex-col items-center'>
          <span className='text-[28px] font-semibold mb-2'>{t(`notification.nothing_here`)}</span>
          <span className='text-lg text-neutral-silver-200 mb-10'>
          {t(`share.add_user`)}
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
          <AddButton text={t(`share.add_participant`)} onClick={() => { openAddParticipantModal({ project }) }} />
        )
      case 'links':
        return (
          <AddButton text={t(`share.share_new_link`)} onClick={() => { openShareLinkModal({ project }) }} />
        )
      case 'users':
        return (
          <AddButton text={t(`share.send_to_user`)} onClick={() => { navigate(`/share/${project.id}?=sendDM`) }} />
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

  const albumPlaysCount = (tracks) => 
    tracks.reduce((totalPlays, track) => totalPlays + (track.plays > 0 ? track.plays : 0), 0);

  const filteredParticipants = (participants) => {
    let filtered = [];

    participants.map((participant) => {
      if (participant.accepted && participant.role !== 'listener') {
        filtered.push(participant.full_name)
      }
    });

    if (filtered.length > 0) {
      return filtered.map((participant, index) => (
        (index ? ', ' : '') + participant)
      )
    }
  }

  const renderView = () => {
    let data, headers;

    switch (permissionsView) {
      case 'participants':
        data = project.participants;
        if (isMobile) {
          headers = [ { title: t(`tables.name`), tag: 'full_name' }, { title: '' }];
        } else {
          headers = [ 
            { title: t(`tables.name`), tag: 'full_name' }, 
            { title: t(`tables.role`), tag: 'role' },
            { title: t(`tables.plays`), tag: 'plays' },
            { title: t(`tables.date_added`), tag: 'date_added' },
            { title: '' }
          ];
        }
        break;

      case 'links':
        data = project.shared_versions.links;
        if (isMobile) {
          headers = [t(`global.link`), '', ''];
        } else {
          headers = [t(`global.link`), t(`share.web_play`), t(`tables.plays`), t(`tables.date_added`), ''];
        }
        break;

      case 'users':
        data = project.shared_versions.users;
        if (isMobile) {
          headers = [ { title: t(`tables.name`) }, { title: '' }, { title:  '' }];
        } else {
          headers = [
            { title : t(`tables.name`) }, 
            { title: t(`global.links_modal.version_shared`)}, 
            { title: t(`share.web_play`) }, 
            { title: t(`tables.plays`) }, 
            { title: t(`tables.date_added`) } , 
            { title:  '' }];
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
              <ParticipantsTable data={data} headers={headers} user={user} invitations={project.invitations} />
            ) : permissionsView === 'links' ? (
              <LinksTable data={data} headers={headers} project={project} />
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
    if (!user.data) {
      setSuspended(true);
      return;
    }

    const { status } = user.data.subscription || {};

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    }
  }, [user]);

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
      { name: t('global.my chest'), link: '/my-chest' },
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
      <div className='container flex flex-col gap-6 md:gap-10 py-8 md:py-10 relative'>
        <div className='toolbar'>
          <div className='grow'>
            <Breadcrumb items={breadcrumb} minify />
          </div>
          <div className='flex justify-end'>
            <div className='fixed flex items-end justify-end gap-3 -mt-4 z-50'>
              <div className='relative'>
              <button
                  disabled={suspended}
                  className={`${
                    hoverShare ? "block" : "hidden"
                  } btn-absolute disabled:opacity-40`}
                >
                  {t('global.share_track')}
                </button>
                <button
                  disabled={suspended}
                  onMouseOver={() => setHoverShare(true)}
                  onMouseLeave={() => setHoverShare(false)}
                  type='button'
                  className='toolbar-button primary disabled:opacity-40'
                  onClick={() => { navigate(`/share/${project.id}?=sendDM`) }}>
                  <ArrowUpTrayIcon className='h-7 w-7' />
                </button>
              </div>
              <div className="relative">
                <button
                  disabled={suspended}
                  onMouseOver={() => setHoverAdd(true)}
                  onMouseLeave={() => setHoverAdd(false)}
                  type="button"
                  className="toolbar-button primary relative disabled:opacity-40"
                  onClick={handleCreateVersion}
                >
                  <PlusIcon className="h-7 w-7" />
                </button>
                <button
                  disabled={suspended}
                  className={`${
                    hoverAdd ? "block" : "hidden"
                  } btn-absolute`}
                >
                  {t('global.add_version')}
                </button>
              </div>
              {isDesktop && (
                <>
                  <div className='relative'>
                    <button
                      disabled={suspended}
                      onMouseOver={() => setHoverEdit(true)}
                      onMouseLeave={() => setHoverEdit(false)}
                      type='button'
                      className='toolbar-button primary disabled:opacity-40'
                      onClick={handleUpdateProject}>
                      <PencilSquareIcon className='h-7 w-7' />
                    </button>
                    <button className={`${hoverEdit ? "block" : "hidden"} 
                            btn-absolute disabled:opacity-40`}>
                        {t('global.edit_track')}
                    </button>
                  </div>
                  <div className='relative'>
                    <button
                      onMouseOver={() => setHoverTrash(true)}
                      onMouseLeave={() => setHoverTrash(false)}
                      type='button'
                      className='toolbar-button alert'
                      onClick={() => { navigate(`/my-chest/treasure/${project?.id}/trash/`) }}>
                      <TrashIcon className='h-7 w-7' />
                    </button>
                    <button className={`${hoverTrash ? "block" : "hidden"} 
                            btn-absolute`}>
                      {t('global.view_trash')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row lg:items-center justify-center gap-4 lg:gap-12'>
          <div className='min-w-[100px] h-[100px] lg:min-w-[220px] lg:h-[220px]'>
            <TrackCoverPreview
              cover={project.cover_url}
              defaultCover={defaultCover}
              onClick={handleEditCover}
            />
          </div>
          <div className='grow mb-3'>
            <div className='uppercase text-neutral-silver-200 mb-4 lg:mb-6'>{project.album} ― {albumPlaysCount(project.versions)} {t('tables.plays')}</div>
            <h2 className='lg:mb-3 text-[64px] lg:text-[76px] text-left'>{project.name}</h2>
            <div className=' text-lg lg:text-[22px]'>
            {filteredParticipants(project.participants)}
            </div>
          </div>
        </div>
        <VersionsTable project={project} />
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-2 bg-neutral-black rounded-t-3xl rounded-b-lg px-5 pt-6 md:px-[60px] md:pt-10'>
            <div className='flex w-full'>
              <div className='flex items-center md:gap-4 grow'>
                <h3 className='hidden md:block text-5xl'>{t('global.permissions')}</h3>
                <h4 className='block md:hidden'>{t('global.permissions')}</h4>
              </div>
              <div className='hidden lg:flex items-center gap-8'>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.participants.length}</span>
                  <span className='text-lg text-neutral-silver-200'>{t('upload.participants')}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.links.length}</span>
                  <span className='text-lg text-neutral-silver-200'>{t('global.links')}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='font-normal text-4xl text-brand-uva font-thunder'>{project.shared_versions.users.length}</span>
                  <span className='text-lg text-neutral-silver-200'>{t('share.users')}</span>
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