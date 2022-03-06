/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import {
  useOvenModalDispatchContext,
  useOvenModalStateContext,
} from '../../contexts/modalContext';

import styled from './Modal.module.scss';

const Modal = () => {
  const { handleCloseModal, closeEscape } = useOvenModalDispatchContext();
  const { isOpen, component } = useOvenModalStateContext();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', closeEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className={styled.backdrop} onClick={handleCloseModal} role="none">
        {component}
      </div>
    )
  );
};

export default Modal;
