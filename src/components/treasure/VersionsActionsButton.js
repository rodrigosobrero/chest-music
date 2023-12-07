import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDeleteVersionMutation, useUpdateVersionMutation } from 'store/api';
import api from 'utils/api';

import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';

import dots from 'assets/images/icon-dots-horizontal.svg';

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function VersionsActionsButton({ version }) {
  const animation = useAnimationControls();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [showRemoveVersion, setShowRemoveVersion] = useState(false);
  const [showEditVersion, setShowEditVersion] = useState(false);
  const [versionName, setVersionName] = useState('');

  const [deleteVersion, { isLoading: loadingDelete }] = useDeleteVersionMutation();
  const [updateVersion, { isLoading: loadingUpdate }] = useUpdateVersionMutation();

  const sequence = async () => {
    if (open) {
      await animation.start({ height: 0 });
      await animation.start({ width: 0 });
      animation.start({ opacity: 0 });
    } else {
      await animation.start({ width: 184, opacity: 100 });
      animation.start({ height: 80 });
    }
  }

  const CustomButton = ({ children, onMouseEnter, onMouseLeave, onClick, className }) => {
    return (
      <button
        type='button'
        className={`bg-neutral-silver-700 text-neutral-silver-200 p-2 rounded-lg test ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        {children}
      </button>
    )
  }

  const toggleOpen = (e) => {
    setOpen(prev => !prev);
    sequence();
  }

  const handleDelete = async () => {
    const result = await deleteVersion(version.id);

    if ('error' in result) {
      console.log('Error');
    } else {
      setShowRemoveVersion(false);
    }
  }

  const handleUpdate = async () => {
    console.log(versionName);

    const result = await updateVersion({
      id: version.id, 
      name: versionName
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      setShowEditVersion(false);
    }
  }

  const downloadVersion = async () => {
    const link = document.createElement('a');

    try {
      const response = await api.get(`project/version/${version.id}/url/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      link.download = 'download';
      link.href = response.data.url;
      link.click();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setVersionName(version.name);
  }, [version])

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
          className='bg-neutral-silver-600 rounded-xl pt-2 px-1.5 pb-1.5 absolute bottom-12 right-0 h-0 overflow-hidden'
          onMouseLeave={toggleOpen}>
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
                        onMouseEnter={() => { setDescription('Share') }}
                        onMouseLeave={() => { setDescription('') }}>
                        <ArrowUpTrayIcon className='h-6 w-6' />
                      </CustomButton>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Download') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={downloadVersion}>
                        <ArrowDownTrayIcon className='h-6 w-6' />
                      </CustomButton>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Edit') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={() => { setShowEditVersion(true) }}>
                        <PencilSquareIcon className='h-6 w-6' />
                      </CustomButton>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Move to Trash can') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={() => { setShowRemoveVersion(true); }}>
                        <TrashIcon className='h-6 w-6' />
                      </CustomButton>
                    </div>
                  </motion.div>
                }
              </>
            }
          </motion.div>
        </motion.div>
      </div>
      <Modal show={showRemoveVersion}>
        <div className='flex flex-col items-center text-center max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>move to trash can</h4>
          <p className='text-white text-lg mb-3'>
            Are you sure you want to move this version to the Trash Can?
            It will be deleted in 30 days.
          </p>
          <div className='bg-black rounded-full px-3 py-1.5'>
            {version.name}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowRemoveVersion(false) }} />
          <Button
            text='Move to trash'
            style='primary'
            disabled={loadingDelete}
            loading={loadingDelete}
            onClick={handleDelete} />
        </div>
      </Modal>
      <Modal show={showEditVersion}>
        <div className='flex flex-col items-center text-center max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>edit version</h4>
        </div>
        <div>
          <Input
            type='text'
            label='Version name'
            required
            value={versionName}
            onChange={(e) => { setVersionName(e.target.value) }} />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowEditVersion(false) }} />
          <Button
            text='Save'
            style='primary'
            disabled={loadingUpdate || version.name === versionName || versionName.length === 0}
            loading={loadingUpdate}
            onClick={handleUpdate} />
        </div>
      </Modal>
    </>
  )
}