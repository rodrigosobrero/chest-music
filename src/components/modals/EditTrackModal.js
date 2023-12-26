import { useEffect, useState } from 'react';
import { useGetChestQuery, useUpdateProjectMutation } from 'store/api';
import { useTranslation } from 'react-i18next';

import { BaseModal } from 'components/BaseModal';
import AutoCompleteAlbum from 'components/AutoCompleteAlbum';
import Input from 'components/Input';
import Button from 'components/Button';

export default function EditTrackModal(props) {
  const { t } = useTranslation();
  const { data: chest } = useGetChestQuery();
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const [track, setTrack] = useState({
    name: '',
    album: ''
  });

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleOnChange = (e) => {
    setTrack({
      ...track,
      name: e.target.value
    })
  }

  const handleOnSearch = (value) => {
    setTrack({
      ...track,
      album: value
    })
  }

  const handleOnSave = async () => {
    const result = await updateProject({
      id: props.meta.id,
      data: {
        'album': track.album,
        'name': track.name
      }
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  useEffect(() => {
    setTrack({
      name: props.meta.name,
      album: props.meta.album
    })
  }, [props]);

  return (
    <BaseModal title='edit track' show={props.isOpen} onClose={handleClose}>
      <form className='flex flex-col gap-4'>
        <Input
          type='text'
          label='Track name'
          value={track.name}
          onChange={handleOnChange}
          required />
        <AutoCompleteAlbum
          searchValue={track.album}
          setSearchValue={handleOnSearch}
          options={chest?.albums ? chest.albums : []}
          label={t('upload.album')}
          placeholder={t('global.write_here')}
          helper={t('upload.leave_empty')} />
      </form>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text={t('global.save')}
          style='primary'
          disabled={isLoading || (props.meta.name === track.name && props.meta.album === track.album)}
          loading={isLoading}
          onClick={handleOnSave} />
      </div>
    </BaseModal>
  )
}