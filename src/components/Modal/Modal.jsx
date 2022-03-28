/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import {
  useModalDispatchContext,
  useModalStateContext,
} from '../../contexts/modalContext';

import styled from './Modal.module.scss';

const Modal = () => {
  const { handleCloseModal, closeEscape } = useModalDispatchContext();
  const { component } = useModalStateContext();

  useEffect(() => {
    if (component) {
      document.addEventListener('keydown', closeEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', closeEscape);
      document.body.style.overflow = 'unset';
    };
  }, [component]);

  return component ? (
    <div className={styled.backdrop} onClick={handleCloseModal} role="none">
      {component}
    </div>
  ) : null;
};

export default Modal;
