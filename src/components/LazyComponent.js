import { closeModal } from 'app/modals';
import { useModal } from 'hooks/useModal';
import { Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isModalOpen, getModalMeta } from 'store/selector';

export default function LazyComponent({ filename }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => isModalOpen(state, filename));
  const meta = useSelector((state) => getModalMeta(state, filename));

  const handleModalClose = () => {
    dispatch(closeModal(filename));
  }

  const Component = lazy(() => 
    import (`components/modals/${filename}`));

  return (
    <Suspense fallback={null}>
      {filename ? (
        <Component isOpen={isOpen} onClose={handleModalClose} meta={meta} />
      ) : null}
    </Suspense>
  )
}