import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDeleteParticipantMutation, useUpdateParticipantMutation } from 'store/api';
import config from 'data/config.json';

import dots from 'assets/images/icon-dots-horizontal.svg';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import Modal from 'components/Modal';
import Select from 'components/Select';
import Button from 'components/Button';

export default function ParticipantsActionsButtons({ participant }) {
  const { t } = useTranslation();
  const animation = useAnimationControls();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [role, setRole] = useState(participant.role);

  const [updateParticipant, { isLoading: isLoadingUpdate }] = useUpdateParticipantMutation();
  const [deleteParticipant, { isLoading: isLoadingDelete }] = useDeleteParticipantMutation();

  const sequence = async () => {
    if (open) {
      await animation.start({ height: 0 });
      await animation.start({ width: 0 });
      animation.start({ opacity: 0 });
    } else {
      await animation.start({ width: participant.removable ? 96 : 52, opacity: 100 });
      animation.start({ height: 80 });
    }
  }

  const toggleOpen = (e) => {
    setOpen(prev => !prev);
    sequence();
  }

  const CustomButton = ({ children, onMouseEnter, onMouseLeave, onClick }) => {
    return (
      <button
        type='button'
        className='bg-neutral-silver-700 p-2 rounded-lg test'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        {children}
      </button>
    )
  }

  const handleEditUser = async () => {
    const result = await updateParticipant({
      id: participant.relation_id,
      role: role
    });

    if ('error' in result) {
      console.log('Error')
    } else {
      setShowEditUser(false);
    }
  }

  const handleDeleteUser = async () => {
    const result = await deleteParticipant({
      id: participant.relation_id, 
      role: participant.role
    });

    if ('error' in result) {
      console.log('Error')
    } else {
      setShowDeleteUser();
    }
  }

  return (
    <>
      <div className='relative'>
        <button
          type='button'
          className={`p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-700 hover:border-neutral-silver-600 ${open && 'bg-neutral-silver-700 border-neutral-silver-600'}`}
          onClick={toggleOpen}>
          <img src={dots} alt='' width={24} height={24} />
        </button>
        <motion.div
          animate={animation}
          initial={{ opacity: 0 }}
          className='bg-neutral-silver-600 rounded-xl pt-2 px-1.5 pb-1.5 absolute bottom-12 right-0 h-0 overflow-hidden' onMouseLeave={() => { setOpen(false); sequence(); }}>
          <motion.div
            className='h-full'
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: open ? 1 : 0, width: '100%' }}
            transition={{ delay: 0.6 }}
            key={!open}>
            {
              open &&
              <>
                {
                  <motion.div
                    className='flex flex-col w-full absolute gap-1.5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <div className='text-sm font-light text-neutral-silver-100'>
                      {description ? description : <span>&nbsp;</span>}
                    </div>
                    <div className='flex flex-row gap-1'>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Edit') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={() => { setShowEditUser(true) }}>
                        <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                      </CustomButton>
                      {participant.removable &&
                        <CustomButton
                          onMouseEnter={() => { setDescription('Delete') }}
                          onMouseLeave={() => { setDescription('') }}
                          onClick={() => { setShowDeleteUser(true) }}>
                          <XCircleIcon className="h-6 w-6 text-gray-500" />
                        </CustomButton>
                      }
                    </div>
                  </motion.div>
                }
              </>
            }
          </motion.div>
        </motion.div>
      </div>
      <Modal show={showEditUser}>
        <div className='flex flex-col items-center text-center mb-8 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>edit participant permissions</h4>
          <p className='text-white text-lg'>
            {participant.full_name} <span className=' text-neutral-silver-300'>@{participant.username}</span>
          </p>
        </div>
        <Select
          options={config.roles}
          name='role'
          label='Role'
          value={role}
          onChange={(e) => { setRole(e.target.value) }} />
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowEditUser(false) }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={isLoadingUpdate || role === participant.role}
            loading={isLoadingUpdate}
            onClick={handleEditUser} />
        </div>
      </Modal>
      <Modal show={showDeleteUser}>
        <div className='flex flex-col items-center text-center mb-4 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>remove from track</h4>
          <p className='text-white text-lg'>
            {participant.full_name} <span className=' text-neutral-silver-300'>@{participant.username}</span>
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowDeleteUser(false) }} />
          <Button
            text='Remove'
            style='error'
            disabled={isLoadingDelete}
            loading={isLoadingDelete}
            onClick={handleDeleteUser} />
        </div>
      </Modal>
    </>
  )
}