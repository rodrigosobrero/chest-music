import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { addFile } from 'app/upload';
import { upload } from 'utils/api';
import { bytesToSize } from 'utils/helpers';
import { useModal } from 'hooks/useModal';

import InputFile from 'components/InputFile';
import ProgressCircle from 'components/ProgressCircle';

import { CheckIcon } from '@heroicons/react/20/solid';

export default function Uploader({ title = true, self, id }) {
  const { accepted_files } = require('data/config.json');
  const { t } = useTranslation();
  const { file } = useSelector((state) => state.upload);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onOpen: openWrongFormatModal } = useModal('WrongFormatModal');
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState({
    loaded: 0,
    total: 0
  });

  const handleFile = (e) => {
    handleDragOver(e);

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files && files.length) {
      const { type } = files[0];

      console.log('file type:', type);

      if (type === 'audio/mpeg' || type === 'audio/wav' || type === 'audio/x-wav' || type === 'audio/x-m4a') {
        const localFileURL = window.URL.createObjectURL(files[0])

        if (self) {
          handleUpload(files[0], localFileURL);
        } else {
          dispatch(addFile({
            filename: files[0].name,
            size: files[0].size,
            blob: localFileURL
          }));

          navigate('upload');
        }

        setShowLoader(true);
      } else {
        openWrongFormatModal();
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleUpload = async (file, fileBlob) => {
    const formData = new FormData();
    const blob = await fetch(fileBlob).then(r => r.blob());
    const getFile = new File([blob], file.name);

    formData.append('files', getFile, file.name);

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

      id(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='uploader py-[60px] px-5'>
        {showLoader
          ? <>
            <ProgressCircle
              percentage={(progress.loaded * 100) / progress.total}
              colour={progress.loaded > 0 && progress.loaded === progress.total ? '#FFB447' : '#7C59DE'} />
            <div className='flex flex-col gap-1'>
              <AnimatePresence>
                {progress.loaded > 0 && progress.loaded === progress.total
                  ? <motion.div
                    className='flex items-center justify-center gap-1.5 text-brand-gold'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}>
                    Uploaded <CheckIcon className='h-4 w-4 text-brand-gold' />
                  </motion.div>
                  : <motion.span
                    className='font-archivo text-center'
                    exit={{ opacity: 0 }}>
                    {bytesToSize(progress.loaded)} {t('global.of')} {bytesToSize(progress.total, 1)}
                  </motion.span>}
              </AnimatePresence>
              <span className='font-archivo text-neutral-silver-300 text-sm text-center'>{file?.filename}</span>
            </div>
          </>
          : <div
            className='flex flex-col items-center w-full h-full'
            onDrop={handleFile}
            onDragOver={handleDragOver}>
            {title && (
              <h5 className='hidden md:block mb-4'>{t('mychest.uploader.title')}</h5>
            )}
            <h5 className='block md:hidden mb-2'>{t('mychest.uploader.title_mobile')}</h5>
            <p className='hidden md:block'>{t('mychest.uploader.description')}</p>
            <p className='block md:hidden text-base'>{t('mychest.uploader.description_mobile')}</p>
            <div className='lg:w-1/4'>
              <InputFile
                accept={accepted_files}
                text={t('global.upload')}
                onChange={handleFile} />
            </div>
          </div>
        }
      </div>
    </>
  )
}