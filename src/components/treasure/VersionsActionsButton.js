import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { getUrlExtension } from 'utils/helpers';
import api from 'utils/api';
import ContextButton from 'components/ContextButton';
import { useTranslation } from 'react-i18next';

export default function VersionsActionsButton({ version, project }) {
  const { user } = useSelector((state) => state.auth);
  const account = useSelector((state) => state.auth.user.data);

  const { onOpen: openShareModal } = useModal('ShareVersionModal');
  const { onOpen: openEditModal } = useModal('EditVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteVersionModal');
  const { t } = useTranslation();
  const [isOpened, setIsOpenned] = useState(false);
  const [options, setOptions] = useState([]);
  const [suspended, setSuspended] = useState(false);

  const toggleOptions = () => setIsOpenned(!isOpened);

  const closeOptions = () => setIsOpenned(false);

  const handleShare = () => {
    openShareModal(version);
  }

  const handleDownload = async () => {

    try {
      const response = await api.get(`project/version/${version.id}/url/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      const filename = {
        version: version.name,
        project: project.name,
        extension: getUrlExtension(response.data.url)
      }

      const link = document.createElement('a');

      link.href = response.data.url;
      link.download = `${filename.project}_${filename.version}.${filename.extension}`;
      link.click();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = () => {
    openEditModal(version);
  }

  const handleDelete = () => {
    openDeleteModal(version);
  }

  const handleAction = (action) => {
    const option = options.find((opt) => opt.type === action);

    if (option && option.action && typeof option.action === 'function') {
      option.action();
    } else {
      console.error(`No valid action found for type: ${action}`);
    }
  }

  useEffect(() => {
    const { status } = account.subscription;

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  }, [account]);

  useEffect(() => {
    const defaultOptions = [
      { type: 'share', description: t('global.share'), action: handleShare, disabled: suspended },
      { type: 'download', description: t('global.download'), action: handleDownload },
      { type: 'edit', description: t('global.edit'), action: handleEdit, disabled: suspended }
    ];
  
    const options = project.versions.length === 1
      ? defaultOptions
      : [...defaultOptions, { type: 'delete', description: t('global.trash_can'), action: handleDelete, disabled: suspended }];
  
    setOptions(options);
  }, [project]);
  
  return (
    <>
      {
        options.length && (
          <ContextButton options={options} action={handleAction} isOpened={isOpened} toggleOptions={toggleOptions} closeOptions={closeOptions} />
        )
      }
    </>
  )
}