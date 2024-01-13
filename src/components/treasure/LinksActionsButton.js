import { useState } from 'react';
import { useModal } from 'hooks/useModal';
import ContextButton from 'components/ContextButton';
import { useTranslation } from 'react-i18next';

export default function LinksActionsButton({ link }) {
  const { t } = useTranslation();
  const { onOpen: openEditModal } = useModal('EditPermissionsLinkModal');
  const { onOpen: openDeleteModal } = useModal('DeletePermissionsLinkModal');
  const [isOpened, setIsOpenned] = useState(false)

  const toggleOptions = () => setIsOpenned(!isOpened);

  const closeOptions=() => setIsOpenned(false);

  const handleDelete = async () => {
    openDeleteModal(link);
  }

  const handleEdit = () => {
    openEditModal(link);
  }

  const handleAction = (action) => {
    const option = options.find((opt) => opt.type === action);

    if (option && option.action && typeof option.action === 'function') {
      option.action();
    } else {
      console.error(`No valid action found for type: ${action}`);
    }
  }

  const options = [
    { type: 'edit', description: t('global.edit'), action: handleEdit },
    { type: 'delete', description: t('global.delete'), action: handleDelete }
  ]

  return (
    <ContextButton options={options} action={handleAction} isOpened={isOpened} toggleOptions={toggleOptions} closeOptions={closeOptions} />
  )
}