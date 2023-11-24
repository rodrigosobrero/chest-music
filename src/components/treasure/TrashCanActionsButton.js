import { useState } from 'react';
import api from 'utils/api';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Modal from 'components/Modal';
import Button from 'components/Button';

import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function TrashCanActionsButton({ id }) {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const restoreVersion = async () => {
    setLoading(true);

    try {
      await api.get(`project/version/${id}/restore/`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setShow(false);
  }

  return (
    <>
      <button
        type='button'
        className='p-2.5 transition duration-200 hover:text-brand-gold'
        onClick={() => { setShow(true) }}>
        <ArrowUpIcon className='h-6 w-6' />
      </button>
      <Modal show={show}>
        <div className='flex flex-col items-center text-center max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>restore version</h4>
          <p className='text-white text-lg'>
            Are you sure you want to move this version to your chest?
          </p>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='third'
            onClick={() => { setShow(false) }} />
          <Button
            text='Restore'
            style='primary'
            disabled={loading}
            loading={loading}
            onClick={restoreVersion} />
        </div>
      </Modal>
    </>
  )
}