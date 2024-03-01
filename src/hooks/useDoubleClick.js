import { useEffect, useRef } from 'react';

const useDoubleClick = (singleClick, doubleClick) => {
  const clicks = useRef([]);
  const timeoutRef = useRef();

  const handleClick = (event) => {
    event.preventDefault();

    clicks.current.push(new Date().getTime());
    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      if (clicks.current.length > 1 && clicks.current[clicks.current.length - 1] - clicks.current[clicks.current.length - 2] < 250) {
        if (doubleClick) {
          doubleClick(event.target);
        }
      } else {
        if (singleClick) {
          singleClick(event.target);
        }
      }
      clicks.current = [];
    }, 250);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return handleClick;
};

export { useDoubleClick };
