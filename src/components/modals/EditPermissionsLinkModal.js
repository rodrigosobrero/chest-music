import { BaseModal } from 'components/BaseModal';

export default function EditPermissionsLinkModal(props) {
  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <>
      <BaseModal
        title='delete user permissions'
        description={props.meta.full_name}
        show={props.isOpen}
        onClose={handleClose}>

      </BaseModal>
    </>
  )
}