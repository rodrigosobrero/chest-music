import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUrlExtension } from 'utils/helpers';
import api from 'utils/api';

import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';

export default function DownloadVersionModal(props) {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [version, setVersion] = useState('');

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const handleSelectVersion = (e) => {
    setVersion(e.target.value);
  }

  const handleDownload = async () => {
    try {
      const response = await api.get(`project/version/${version}/url/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      const filename = {
        version: props.meta.versions.find(ver => ver.id == version).name,
        project: props.meta.project.name,
        extension: getUrlExtension(response.data.url)
      }

      const link = document.createElement('a');

      link.href = response.data.url;
      link.download = `${filename.project}_${filename.version}.${filename.extension}`;
      link.click();

      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BaseModal
      title='choose version'
      description='Choose a version of this track to download'
      show={props.isOpen}
      onClose={handleClose}>
      <div className='version-options mt-5'>
        {
          props.meta.versions.map((version) =>
            <div className='relative' key={version.id}>
              <input
                type='radio'
                id={version.id}
                value={version.id}
                name='plan'
                onChange={handleSelectVersion} />
              <label htmlFor={version.id}>
                <span className='text-lg'>
                  {version.name}
                  {version.id === props.meta.lastVersion && ' (final)'}
                </span>
              </label>
            </div>
          )
        }
      </div>
      <div className='grid grid-cols-2 gap-4 mt-8'>
        <Button
          text={t('global.cancel')}
          style='tertiary'
          onClick={handleClose} />
        <Button
          text='Download'
          style='primary'
          disabled={!version}
          onClick={handleDownload} />
      </div>
    </BaseModal>
  )
}