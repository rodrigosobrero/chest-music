import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Modal from 'components/Modal';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import ProgressCircle from 'components/ProgressCircle';
import TrackCoverSelector from 'components/TrackCoverSelector';
import TrackCoverPreview from 'components/TrackCoverPreview';
import Dropdown from 'components/Dropdown';

import { CheckIcon } from '@heroicons/react/20/solid';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function Upload() {
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState('');
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [participants, setParticipants] = useState([]);
  const [track, setTrack] = useState({
    name: '',
    version: '',
    album: '',
    userRole: '',
    cover: ''
  });

  /* Replace with API */
  const participantsRoles = [
    'artist',
    'producer',
    'listener',
    'feat'
  ];
  const roles = [
    'artist',
    'producer',
    'feat'
  ];
  const totalSize = 54.7;
  const leftSize = 27;
  const filename = 'just-a-feeling-v1.wav';

  const nextStep = () => {
    setParticipants([
      ...participants, { 
      username: 'Current user',
      type: track.userRole
    }]);
    setStep(1);
  }

  const updatePreview = (state) => {
    setPreview(state);
  }

  const saveCover = () => {
    setOpen(false);
    setTrack({ 
      ...track, 
      cover: preview 
    });
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

  const addParticipant = (user, role) => {
    const list = [...participants, { user: user, role: role }];
    setParticipants(list);
    setUser('');
  }

  const Participant = ({ user, role }) => (
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
            list={participantsRoles} 
            remove={() => removeParticipant(user)}
            selected={role} 
            set={(role) => { updateParticipant(user, role) }} />
        </div>
      </div>
    </>
  )

  const userSelector = () => {
    return (
      <div className='relative'>
        <input type='text' value={user} onChange={(e) => setUser(e.target.value)} className='custom-input !pr-16 md:!pr-40' />
        <select
          className='custom-select capitalize absolute top-0 right-0 !border-0 !w-auto !bg-transparent'
          onChange={(e) => { setRole(e.target.value) }}>
          {participantsRoles.map((role, index) => <option value={role} key={index}>{role}</option>)}
        </select>
      </div>
    )
  }

  const stepOne = () => {
    return (
      <div className='flex flex-col md:flex-row w-full gap-4 md:gap-0'>
        <div className='bg-neutral-silver-700 rounded-2xl px-8 py-[37px] w-full order-2 md:order-1'>
          <h3 className='mb-8 text-center'>{t('upload.title')}</h3>
          <div className='flex flex-col gap-5'>
            <Input type='text' value={track.name} onChange={e => { setTrack({ ...track, name: e.target.value }) }} placeholder={t('global.write_here')} label={t('upload.track_name')} />
            <Input type='text' value={track.version} onChange={e => { setTrack({ ...track, version: e.target.value }) }} placeholder={t('global.write_here')} label={t('upload.version')} />
            <Input type='text' value={track.album} onChange={e => { setTrack({ ...track, album: e.target.value }) }} placeholder={t('global.write_here')} label={t('upload.album')} helper={t('upload.leave_empty')} />
            <Select options={roles} label={t('upload.your_role')} value={track.userRole} onChange={e => { setTrack({ ...track, userRole: e.target.value }) }} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center md:px-[72px] order-1 md:order-2 p-5 md:p-0 gap-4 md:gap-0'>
          <ProgressCircle percentage={leftSize * 100 / totalSize} colour='#7C59DE' />
          <div className='flex flex-col '>
            <span className='font-archivo'>{leftSize} MB {t('global.of')} {totalSize} MB</span>
            <span className='font-archivo text-neutral-silver-300 text-sm'>{filename}</span>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 md:gap-6 order-3'>
          <div className='flex flex-col items-center justify-center bg-neutral-silver-700 rounded-2xl p-8 grow'>
            <TrackCoverPreview cover={track.cover} onClick={() => { setOpen(true) }} />
            <h4 className={`mt-8 ${track.name ? 'text-white' : 'text-neutral-silver-200'}`}>
              {track.name ? track.name : 'track name'}
            </h4>
            <p className='text-neutral-silver-200 uppercase mt-2 !mb-0 text-base md:text-lg'>
              {track.album ? track.album : 'single'} {track.version && ` — ${track.version}`}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4 md:gap-6'>
            <Link to={'/my-chest'}>
              <Button text={t('global.cancel')} type='third' />
            </Link>
            <Button
              text={t('global.continue')}
              type='primary'
              onClick={nextStep}
              disabled={track.name && track.version && track.cover ? false : true} />
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
              style={{ backgroundImage: `url("${track.cover}")` }}>
            </div>
            <h4 className='mt-8'>
              {track.name ? track.name : 'track name'}
            </h4>
            <p className='text-neutral-silver-200 uppercase mt-2 !mb-0 text-base md:text-lg'>
              {track.album ? track.album : 'single'} {track.version && ` — ${track.version}`}
            </p>
          </div>
          <div className='bg-neutral-silver-700 rounded-2xl w-full px-4 pt-6 pb-10 md:p-8'>
            <div className='font-semibold mb-1.5'>{t('upload.participant')}</div>
            <div className='flex flex-row gap-4 mb-6'>
              <div className='grow'>
                {userSelector()}
              </div>
              <button
                type='button'
                className='rounded-xl p-3 w-[54px] bg-brand-gold text-black disabled:text-neutral-silver-300 disabled:bg-neutral-silver-500 flex justify-center'
                disabled={!user}
                onClick={() => addParticipant(user, role)}>
                <CheckIcon className='h-7 w-7' />
              </button>
            </div>
            <div className='flex flex-col gap-4'>
              {participants.map((user, index) =>
                <div key={index}>
                  <Participant user={user.user} role={user.role} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row w-full md:w-2/6 gap-4 md:gap-6'>
          <Button text={t('global.back')} type='third' onClick={() => setStep(0)} />
          <Button text={t('global.confirm')} type='primary' />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='uploader w-full'>
        {step === 0 ? stepOne() : stepTwo()}
      </div>

      <Modal show={open}>
        <div className='flex flex-col items-center text-center mb-[41px] max-w-[440px]'>
          <h4 className='mb-3'>{t('upload.edit_cover')}</h4>
          <p className='text-neutral-silver-200 text-lg mb-6'>{t('upload.edit_instruction')}</p>
          <TrackCoverSelector preview={preview} updatePreview={updatePreview} />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Button text={t('global.cancel')} type='third' onClick={() => { setOpen(false) }} />
          <Button text={t('global.save')} type='primary' onClick={saveCover} />
        </div>
      </Modal>
    </>
  )
}