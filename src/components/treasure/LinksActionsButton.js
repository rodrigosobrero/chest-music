import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import config from 'data/config.json';
import api from 'utils/api';

import dots from 'assets/images/icon-dots-horizontal.svg';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import Modal from 'components/Modal';
import Select from 'components/Select';
import Button from 'components/Button';
import Input from 'components/Input';
import Toggle from 'components/share/Toggle';

export default function LinksActionsButton({ link }) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const animation = useAnimationControls();

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState('');
  const [showEditLink, setShowEditLink] = useState(false);
  const [showDeleteLink, setShowDeleteLink] = useState(false);
  const [playLimit, setPlayLimit] = useState('');
  const [unlimited, setUnlimited] = useState(false);
  const [allowWebPlay, setAllowWebPlay] = useState(false);
  const [disablePlayLimit, setDisablePlayLimit] = useState(true);

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

  const editLink = async () => {
    setLoading(true);

    const data = {
      allow_web_play: allowWebPlay,
      play_limit: playLimit
    }

    try {
      await api.patch(`shared/link/${link.id}/`, data, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setShowEditLink(false);
  }

  const deleteLink = async () => {
    setLoading(true);

    try {
      await api.delete(`shared/link/${link.id}/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setShowDeleteLink(false);
  }

  const handleWebPlay = () => {
    setAllowWebPlay(!allowWebPlay);
  }

  const handleUnlimited = () => {
    setUnlimited(!unlimited);
    setDisablePlayLimit(!disablePlayLimit);
    setPlayLimit('');
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
                        onClick={() => { setShowEditLink(true) }}>
                        <PencilSquareIcon className="h-6 w-6 text-gray-500" />
                      </CustomButton>
                      <CustomButton
                        onMouseEnter={() => { setDescription('Delete') }}
                        onMouseLeave={() => { setDescription('') }}
                        onClick={() => { setShowDeleteLink(true) }}>
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
      <Modal show={showEditLink}>
        <div className='flex flex-col items-center text-center mb-8 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>edit link permissions</h4>
          <p className='text-white text-lg'>
            /{link.token}
          </p>
        </div>
        <div className='flex flex-row gap-5 items-center mb-6'>
          <div className='grow'>
            <Input onlyNumeric value={playLimit} disabled={!disablePlayLimit} onChange={(e) => { setPlayLimit(e.target.value) }} label='Play limit' />
          </div>
          <div className='flex items-center justify-center gap-2.5'>
            <div className='flex items-center'>
              <Toggle onChange={handleUnlimited} />
            </div>
            <span className='pt-6'>Unlimited</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='checkbox'
            name='terms'
            id='webplay'
            onChange={handleWebPlay} />
          <label htmlFor='webplay'>
            Allow web play
          </label>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowEditLink(false) }} />
          <Button
            text={t('global.save')}
            style='primary'
            disabled={loading}
            loading={loading}
            onClick={editLink} />
        </div>
      </Modal>
      <Modal show={showDeleteLink}>
        <div className='flex flex-col items-center text-center mb-4 max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>remove link</h4>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShowDeleteLink(false) }} />
          <Button
            text='Remove'
            style='error'
            disabled={loading}
            loading={loading}
            onClick={deleteLink} />
        </div>
      </Modal>
    </>
  )
}