import { memo } from 'react';
import { createPortal } from 'react-dom';
import { classNames } from 'utils/helpers';

import { XMarkIcon } from '@heroicons/react/24/outline';

export const BaseModal = memo(({ title, description, footer, onClose, children, show, closeOnTap, customClass = '', cover }) => {
  const root = document.getElementById('root');

  if (!root) throw new Error('Root not found. Cannot render modal.');

  const handleOutsideClick = (e) => {
    if (onClose) {
      onClose();
    }
  }

  const handleInsideClick = (e) => {
    if (!closeOnTap) {
      e.stopPropagation();
    }
  }

  return createPortal(
    <div
      className={classNames({
        'modal-backdrop': true,
        'visible': show
      })}
      onClick={handleOutsideClick}>
      <div className='modal-container'>
        <div className='modal-wrapper'>
          <div
            className={`modal-panel ${customClass}`}
            onClick={handleInsideClick}>
            <div className={`flex md:hidden md:invisible ${cover ? 'justify-between items-start' : 'justify-end'} mb-2`}>
              {cover &&
                 <img src={cover} className='h-24 w-24'/> 
              }
              <button type='button' className='p-1.5' onClick={onClose}>
                <XMarkIcon className='h-6 w-6 text-white' />
              </button>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <h4>{title}</h4>
              {description && <p>{description}</p>}
            </div>
            <div>{children}</div>
            {footer && <div>{footer}</div>}
          </div>
        </div>
      </div>
    </div>,
    root
  )
});