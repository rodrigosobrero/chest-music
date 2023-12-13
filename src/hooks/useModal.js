import { openModal, closeModal } from 'app/modals';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalOpen } from 'store/selector';

export function useModal(modalFileName) {
  const dispatch = useDispatch();

  const onOpen = useCallback(meta => dispatch(openModal(modalFileName, meta)), [
    modalFileName
  ]);

  const onClose = useCallback(() => dispatch(closeModal(modalFileName)), [
    modalFileName
  ]);

  const isOpen = useSelector(state => isModalOpen(state, modalFileName));

  return {
    isOpen,
    onOpen,
    onClose,
  }
}