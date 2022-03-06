/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import {
  useModalDispatchContext,
  useModalStateContext,
} from '../../contexts/modalContext';

import styled from './Modal.module.scss';

const Modal = () => {
  const { handleCloseModal, closeEscape } = useModalDispatchContext();
  const { isOpen, component } = useModalStateContext();

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
