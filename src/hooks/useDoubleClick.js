import { useCallback, useRef } from 'react';

export const useDoubleClick = (click, doubleClick, timeout = 100) => {
  const clickTimeout = useRef();

  const clearClickTimeout = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return useCallback((event) => {
    event.preventDefault();
    clearClickTimeout();

    if (click && event.detail === 1) {
      clickTimeout.current = setTimeout(() => {
        click(event);
      }, timeout);
    }

    if (event.detail % 2 === 0) {
      doubleClick(event);
    }
  }, [click, doubleClick, timeout]);
};