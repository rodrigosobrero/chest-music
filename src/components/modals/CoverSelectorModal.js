import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateProjectMutation } from 'store/api';
import { upload } from 'utils/api';

import { BaseModal } from 'components/BaseModal';
import TrackCoverSelector from 'components/TrackCoverSelector';
import Button from 'components/Button';

export default function CoverSelectorModal(props) {
  const { t } = useTranslation();
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const [loadingImage, setLoadingImage] = useState(false);
  const [preview, setPreview] = useState({});

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnSave = async (id) => {
    const result = await updateProject({
      id: props.meta.project.id,
      data: {
        'cover': id
      }
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
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
        headers: { Authorization: `Bearer ${props.meta.user.token}` }
      });

      handleOnSave(response.data.id);
    } catch (error) {
      console.log(error);
    }

    setLoadingImage(false);
  }

  const updatePreview = (state) => {
    if (state) setPreview(state);
  }

  const saveCover = () => {
    if (preview.local) {
      handleUploadImage();
    } else {
      handleOnSave(preview.id);
    }
  }

  return (
    <BaseModal
      title={t('upload.edit_cover')}
      description={t('upload.edit_instruction')}
      customClass='max-w-[520px]'
      show={props.isOpen}
      onClose={handleClose}>
      <div className='flex flex-col items-center justify-center my-6'>
        <TrackCoverSelector
          selectedCover={preview}
          preview={preview.url}
          updatePreview={updatePreview}
          covers={props.meta.covers.concat(props.meta.covers).sort()} />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.save')}
          style='primary'
          onClick={saveCover}
          disabled={isLoading || loadingImage}
          loading={isLoading || loadingImage} />
      </div>
    </BaseModal>
  )
}