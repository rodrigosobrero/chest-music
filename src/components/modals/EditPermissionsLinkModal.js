import { useState } from 'react';
import { useUpdateLinkMutation } from 'store/api';
import { useTranslation } from 'react-i18next';

import { BaseModal } from 'components/BaseModal';
import Input from 'components/Input';
import Toggle from 'components/share/Toggle';
import Button from 'components/Button';

export default function EditPermissionsLinkModal(props) {
  const { t } = useTranslation();
  const [updateLinkPermissions, { isLoading }] = useUpdateLinkMutation();

  const [playLimit, setPlayLimit] = useState(props.meta.play_limit);
  const [webPlay, setWebPlay] = useState(props.meta.allow_web_play);
  const [unlimited, setUnlimited] = useState(props.meta.play_limit);

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handlePlayLimit = (e) => {
    setPlayLimit(e.target.value);
  }

  const handleUnlimited = (e) => {
    setUnlimited(prev => !prev);

    if (unlimited) setPlayLimit('');
  }

  const handleWebPlay = (e) => {
    setWebPlay(prev => !prev);
  }

  const handleSave = async () => {
    const data = {
      'allow_web_play': webPlay,
      'play_limit': playLimit || null
    }

    const result = await updateLinkPermissions({
      id: props.meta.id,
      data
    });

    if ('error' in result) {
      console.log('Error');
    } else {
      handleClose();
    }
  }

  const handleCancel = () => {
    handleClose();
  }

  return (
    <BaseModal
      title={t('share.edit_link_permissions')}
      description={`/${props.meta.token}`}
      show={props.isOpen}
      onClose={handleClose}>
      <div className='flex flex-row gap-5 items-center mb-6'>
        <div className='grow'>
          <Input
            onlyNumeric
            value={playLimit}
            disabled={!unlimited}
            onChange={handlePlayLimit} label={t('share.play_limit')} />
        </div>
        <div className='flex items-center justify-center gap-2.5'>
          <div className='flex items-center'>
            <Toggle checked={!unlimited} onChange={handleUnlimited} />
          </div>
          <span className='pt-6'>{t('global.unlimited')}</span>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          name='terms'
          id='webplay'
          checked={webPlay}
          onChange={handleWebPlay} />
        <label htmlFor='webplay'>
        {t('share.allow_web_play')}
        </label>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style={'tertiary'}
          onClick={handleCancel} />
        <Button
          text={t('global.save')}
          style={'primary'}
          disabled={isLoading || (unlimited && !playLimit)}
          loading={isLoading}
          onClick={handleSave} />
      </div>
    </BaseModal>
  )
}