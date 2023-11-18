import { addFile } from 'app/upload';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import config from 'data/config.json';
import InputFile from 'components/InputFile';
import Modal from 'components/Modal';
import Button from 'components/Button';

export default function Uploader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleFile = (e) => {
    handleDragOver(e);

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files && files.length) {
      if (files[0].type === 'audio/mpeg') {
        const localFileURL = window.URL.createObjectURL(files[0])

        dispatch(addFile({
          filename: files[0].name,
          size: files[0].size,
          blob: localFileURL
        }));

        navigate('upload');
      } else {
        setShow(true);
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <div 
        className='uploader py-[60px] px-5' 
        onDrop={handleFile} 
        onDragOver={handleDragOver}>
        <h5 className='hidden md:block mb-4'>{t('mychest.uploader.title')}</h5>
        <h5 className='block md:hidden mb-2'>{t('mychest.uploader.title_mobile')}</h5>
        <p className='hidden md:block'>{t('mychest.uploader.description')}</p>
        <p className='block md:hidden text-base'>{t('mychest.uploader.description_mobile')}</p>
        <div>
          <InputFile 
            accept={config.accepted_files} 
            text={t('global.upload')}
            onChange={handleFile} />
        </div>
      </div>
      <Modal show={show}>
        <div className='flex flex-col items-center text-center max-w-[440px]'>
          <h4 className='mb-3 !text-5xl'>wrong format</h4>
          <p className='text-neutral-silver-200 text-lg mb-8'>
            The file you uploaded isn’t .wav or .mp3, please try again with the correct file format.
          </p>
        </div>
        <div className='flex justify-center'>
          <div className='w-1/3'>
            <Button text='Close' style='third' onClick={() => { setShow(false) }} />
          </div>
        </div>
      </Modal>
    </>
  )
}