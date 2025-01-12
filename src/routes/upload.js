import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { bytesToSize } from 'utils/helpers';
import { upload } from 'utils/api';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import ProgressCircle from 'components/ProgressCircle';
import TrackCoverSelector from 'components/TrackCoverSelector';
import TrackCoverPreview from 'components/TrackCoverPreview';
import Dropdown from 'components/Dropdown';
import AutoComplete from 'components/AutoComplete';
import AutoCompleteAlbum from 'components/AutoCompleteAlbum';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import {
  MicrophoneIcon,
  MusicalNoteIcon,
  MegaphoneIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateProjectMutation, useGetChestQuery } from 'store/api';

export default function Upload() {
  const { roles } = require('data/config.json');
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.auth.user);
  const { file } = useSelector((state) => state.upload);
  const navigate = useNavigate();

  const { data: chest = {}, isLoading } = useGetChestQuery();
  const [createProject, { isLoading: isLoadingProject }] = useCreateProjectMutation();

  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState('');
  const [participants, setParticipants] = useState([]);
  const [album, setAlbum] = useState('');
  const [progress, setProgress] = useState({
    loaded: 0,
    total: 0,
    error: ''
  });
  const [cover, setCover] = useState('');
  const [covers, setCovers] = useState([]);
  const [defaultCover, setDefaultCover] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState();
  const [track, setTrack] = useState({
    name: '',
    version: '',
    album: '',
    userRole: 'artist',
    cover: '',
    fileId: ''
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'all' });

  track.name = watch('name');
  track.version = watch('version');

  useEffect(() => {
    if (roles) setFilteredRoles(roles.filter(role => role !== 'listener'));
  }, [roles]);

  useEffect(() => {
    handleUpload();
  }, []);

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

  const handleOnChangeRole = (event) => {
    setTrack({ ...track, userRole: event.target.value });
  }

  const handleUpload = async () => {
    const formData = new FormData();
    const blob = await fetch(file.blob).then(r => r.blob()).catch(e => navigate('/my-chest'));
    const getFile = new File([blob], file.filename);

    formData.append('files', getFile, file.filename);

    try {
      const response = await upload.post('audio', formData, {
        headers: { Authorization: `Bearer ${user?.token}` },
        onUploadProgress: (progressEvent) => {
          setProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
          });
        }
      });
      setTrack({ ...track, fileId: response.data.id });
    } catch (error) {
      console.log(error.response.data.error)
      setProgress({
        loaded: 0,
        error: error.response.data.error
      })
    }
  }

  const handleUploadImage = async () => {
    const formData = new FormData();
    const blob = await fetch(preview.url).then(r => r.blob());
    const getFile = new File([blob], preview.filename);

    formData.append('files', getFile, preview.filename);

    setLoadingImage(true);

    try {
      const response = await upload.post('image', formData, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      setCover(response.data.url);
      setTrack({
        ...track,
        cover: response.data.id
      })
    } catch (error) {
      console.log(error);
    }

    setLoadingImage(false);
    setOpen(false);
  }

  const handleCreateProject = async () => {

    let formatParticipants = { invitations: [], participants: [] };

    participants.forEach((participant) => {
      if (participant.isEmail) {
        formatParticipants.invitations.push({ role: participant.role, email: participant.id })
      }
      else {
        formatParticipants.participants.push({ role: participant.role, user: participant.id })
      }
    });

    const result = await createProject({
      'name': track.name,
      'album': album,
      'cover': track.cover ? track.cover : defaultCover.id,
      'version': {
        'name': track.version,
        'audio': track.fileId
      },
      'participants': formatParticipants.participants,
      'invitations': formatParticipants.invitations
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      navigate('/my-chest')
    }
  }

  const nextStep = () => {
    addOrUpdateParticipant({
      id: data.user_id,
      user: data.full_name,
      role: track.userRole,
      isOwner: true,
    });

    setStep(1);
  }

  const updatePreview = (state) => {
    if (state) setPreview(state);
  }

  const saveCover = () => {
    if (preview.local) {
      handleUploadImage();
    } else {
      setCover(preview.url);
      setTrack({
        ...track,
        cover: preview.id
      });
      setOpen(false);
    }
  }

  const addOrUpdateParticipant = (user) => {
    const itemIndex = participants.findIndex(participant => participant.id === user?.id);
    let list;

    if (itemIndex >= 0) {
      list = [...participants];
      list[itemIndex] = user;
    } else {
      list = [...participants, user]
    }

    setParticipants(list);
  }

  const removeParticipant = (user) => {
    setParticipants((current) =>
      current.filter((participant) => participant.user !== user)
    );
  }

  const updateParticipant = (user, role) => {
    const itemIndex = participants.findIndex(participant => participant.user === user);
    const list = [...participants];

    list[itemIndex] = {
      ...list[itemIndex],
      role: role
    }

    setParticipants(list);
  }

  const addParticipant = (user, role, id, isEmail) => {
    const list = [...participants, { user: user, role: role, id: id, isEmail: isEmail }];
    setParticipants(list);
  }

  const Participant = ({ user, role, isOwner }) => (
    <>
      <div className='flex flex-row items-center gap-3'>
        <div className='p-2 bg-black rounded-full'>
          {(() => {
            switch (role) {
              case 'artist':
                return <MicrophoneIcon className='h-5 w-5 text-brand-gold' />
              case 'listener':
                return <MusicalNoteIcon className='h-5 w-5 text-white' />
              case 'feat':
                return <MegaphoneIcon className='h-5 w-5 text-green-500' />
              case 'producer':
                return <ComputerDesktopIcon className="h-5 w-5 text-violet-500" />
            }
          })()}
        </div>
        <div className='flex flex-row w-full items-center justify-center'>
          <div className='grow flex items-center'><span className='!mb-0 text-ellipsis !text-white'>{user}</span></div>
          <Dropdown
            list={isOwner ? roles.filter(role => role !== 'listener') : roles}
            isOwner={isOwner}
            remove={() => removeParticipant(user)}
            selected={role}
            set={(role) => { updateParticipant(user, role) }} />
        </div>
      </div>
    </>
  )

  const stepOne = () => {
    return (
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-0'>
        <div className='bg-neutral-silver-700 rounded-2xl px-4 md:px-8 py-[37px] w-full order-2 md:order-1'>
          <h3 className='mb-8 text-center'>{t('upload.title')}</h3>
          <form
            id='first-step'
            name='first-step'
            className='flex flex-col gap-5'
            onSubmit={handleSubmit(nextStep)}>
            <Input
              type='text'
              name='name'
              required
              register={register}
              placeholder={t('global.write_here')}
              label={t('upload.track_name')}
              error={errors.name && t('global.required')} />
            <Input
              type='text'
              name='version'
              required
              register={register}
              placeholder={t('global.write_here')}
              label={t('upload.version')}
              error={errors.version && t('global.required')} />
            <AutoCompleteAlbum
              searchValue={album}
              setSearchValue={setAlbum}
              options={chest?.albums ? chest.albums : []}
              label={t('upload.album')}
              placeholder={t('global.write_here')}
              helper={t('upload.leave_empty')} />
            <Select
              options={filteredRoles}
              name='role'
              label={t('upload.your_role')}
              value={track.userRole}
              onChange={handleOnChangeRole} />
          </form>
        </div>
        <div className='flex flex-col items-center justify-center md:px-[72px] order-1 md:order-2 p-5 md:p-0 gap-4 md:gap-0'>
          <ProgressCircle error={progress.error} percentage={(progress.loaded * 100) / progress.total} colour={progress.loaded > 0 && progress.loaded === progress.total ? '#FFB447' : '#7C59DE'} />
          <div className='flex flex-col gap-1 md:-mt-0 -mt-6'>
            <AnimatePresence>
              {progress.loaded > 0 && progress.loaded === progress.total
                ? <motion.div
                  className='flex items-center justify-center gap-1.5 text-brand-gold'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}>
                  {t('upload.uploaded')} <CheckIcon className='h-4 w-4 text-brand-gold' />
                </motion.div>
                : <motion.span
                  className='font-archivo text-center text-brand-red'
                  exit={{ opacity: 0 }}>
                  {!progress.error ? `${bytesToSize(progress.loaded)} ${t('global.of')} ${bytesToSize(progress.total, 1)}` : progress.error + '.Try another file or try again later'}
                </motion.span>}
            </AnimatePresence>
            <span className='font-archivo text-neutral-silver-300 text-sm text-center' >{file.filename}</span>
            <div className='flex items-center gap-3 py-3 max-w-md grow rounded-xl ' style={{ color: '#B296FF' }} data-tooltip-id='a'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='svg-icon'>
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {t('upload.bits_info')}
              <ReactTooltip id='a' style={{
                width: '306px',
                height: '78px',
                padding: '12px',
                gap: '10px',
                borderRadius: '12px 12px 12px 12px',
                background: '#E6E9ED',
                color: '#000',
              }}>
                {t('plans.tooltip')}
              </ReactTooltip>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 md:gap-6 order-3'>
          <div className='flex flex-col items-center justify-center bg-neutral-silver-700 rounded-2xl p-8 grow'>
            <div className='w-[140px] md:w-[200px] h-[140px] md:h-[200px]'>
              <TrackCoverPreview
                cover={cover}
                defaultCover={defaultCover}
                onClick={() => { setOpen(true) }} />
            </div>
            <h4 className={`mt-8 !text-center ${track.name ? 'text-white' : 'text-neutral-silver-200'}`}>
              {track.name ? track.name : 'track name'}
            </h4>
            <p className='text-neutral-silver-200 uppercase mt-2 !mb-0 text-base md:text-lg'>
              {album ? album : 'single'} {track.version && ` — ${track.version}`}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4 md:gap-6'>
            <Link to={'/my-chest'}>
              <Button text={t('global.cancel')} style='tertiary' />
            </Link>
            <Button
              text={t('global.continue')}
              type='submit'
              style='primary'
              disabled={progress.loaded !== progress.total}
              form='first-step' />
          </div>
        </div>
      </div>
    )
  }

  const stepTwo = () => {
    return (
      <>
        <h3 className='mb-4 md:mb-8'>{t('upload.participants')}</h3>
        <div className='flex flex-col md:flex-row w-full gap-6 mb-4 md:mb-10'>
          <div className='flex flex-col items-center justify-center bg-neutral-silver-700 rounded-2xl w-full px-4 py-8 md:p-8'>
            <div
              className='bg-neutral-silver-300 w-[140px] md:w-[200px] h-[140px] md:h-[200px] rounded-lg bg-no-repeat bg-center bg-cover'
              style={{ backgroundImage: `url("${cover ? cover : defaultCover.url}")` }}>
            </div>
            <h4 className='mt-8 !text-center'>
              {track.name ? track.name : 'track name'}
            </h4>
            <p className='text-neutral-silver-200 uppercase mt-2 !mb-0 text-base md:text-lg'>
              {track.album ? track.album : 'single'} {track.version && ` — ${track.version}`}
            </p>
          </div>
          <div className='bg-neutral-silver-700 rounded-2xl w-full px-4 pt-6 pb-10 md:p-8'>
            <div className='font-semibold mb-1.5'>{t('upload.participant')}</div>
            <AutoComplete
              options={roles}
              handleAdd={addParticipant}
              filter_ids={participants.map((participant) => participant.id)} />
            <div className='flex flex-col gap-4'>
              {participants.map((user, index) =>
                <div key={index}>
                  <Participant user={user?.user} role={user?.role} isOwner={user.isOwner} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row w-full md:w-2/6 gap-4 md:gap-6'>
          <Button text={t('global.back')} style='tertiary' onClick={() => setStep(0)} />
          <Button
            text={t('global.confirm')}
            style='primary'
            onClick={handleCreateProject}
            loading={isLoadingProject}
            disabled={isLoadingProject} />
        </div>
      </>
    )
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <div className='container py-8 lg:py-[60px]'>
        <div className='uploader p-4 md:p-[60px]'>
          {step === 0 ? stepOne() : stepTwo()}
        </div>
      </div>

      <Modal show={open} setShow={setOpen}>
        <div className='flex flex-col items-center text-center mb-[41px] max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>{t('upload.edit_cover')}</h4>
          <p className='text-neutral-silver-200 text-lg mb-6'>{t('upload.edit_instruction')}</p>
          <TrackCoverSelector
            selectedCover={preview}
            preview={preview?.url}
            updatePreview={updatePreview}
            covers={covers.concat(covers).sort()} />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Button
            text={t('global.cancel')}
            style='tertiary'
            onClick={() => { setOpen(false) }} />
          <Button
            text={t('global.save')}
            style='primary'
            onClick={saveCover}
            disabled={loadingImage}
            loading={loadingImage} />
        </div>
      </Modal>
    </>
  )
}