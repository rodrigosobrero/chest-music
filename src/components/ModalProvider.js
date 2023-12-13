import { useSelector } from 'react-redux';
import { getModalList } from 'store/selector';
import LazyComponent from './LazyComponent';

export default function({ children }) {
  const modals = useSelector(getModalList);

  return (
    <>
      {modals.map((filename) => (
        <LazyComponent key={filename} filename={filename} />
      ))}
      {children}
    </>
  )
}