import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDeleteLinkMutation } from 'store/api';
import { useModal } from 'hooks/useModal';

import Modal from 'components/Modal';
import Button from 'components/Button';

import dots from 'assets/images/icon-dots-horizontal.svg';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function UsersActionsButton({ link }) {
  const { t } = useTranslation();
  const animation = useAnimationControls();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [showDeleteLink, setShowDeleteLink] = useState(false);

  const [deleteLink, { isLoading: isLoadingDelete }] = useDeleteLinkMutation();

  const { onOpen: openEditModal } = useModal('EditPermissionsUserModal');
  const { onOpen: openDeleteModal } = useModal('DeletePermissionsUserModal');

  const sequence = async () => {
    if (open) {
      await animation.start({ height: 0 });
      await animation.start({ width: 0 });
      animation.start({ opacity: 0 });
    } else {
      await animation.start({ width: 96, opacity: 100 });
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

  const handleDeleteLink = async () => {
    const result = await deleteLink(link.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      setShowDeleteLink(false);
    }
  }

  const handleEdit = () => {
    openEditModal(link)
  }

  const handleDelete = () => {
    openDeleteModal(link);
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
                        onClick={handleEdit}>
                        <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                      </CustomButton>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Delete') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={handleDelete}>
                        <XCircleIcon className="h-6 w-6 text-gray-500" />
                      </CustomButton>
                    </div>
                  </motion.div>
                }
              </>
            }
          </motion.div>
        </motion.div>
      </div>
      <Modal show={showDeleteLink}>
        <div className='flex flex-col items-center text-center mb-4 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>remove link</h4>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style={'third'}
            onClick={() => { setShowDeleteLink(false) }} />
          <Button
            text='Remove'
            style={'error'}
            disabled={isLoadingDelete}
            loading={isLoadingDelete}
            onClick={handleDeleteLink} />
        </div>
      </Modal>
    </>
  )
}