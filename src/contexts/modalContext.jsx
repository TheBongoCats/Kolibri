import { createContext, useContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';

// state context
const ModalStateContext = createContext({});
ModalStateContext.displayName = 'ModalStateContext';

const useModalStateContext = () => {
  const context = useContext(ModalStateContext);

  if (!context) {
    throw new Error('ModalStateContext must be used within a ModalProvider');
  }

  return context;
};

// dispatch context
const ModalDispatchContext = createContext({});
ModalDispatchContext.displayName = 'ModalDispatchContext';

const useModalDispatchContext = () => {
  const context = useContext(ModalDispatchContext);

  if (!context) {
    throw new Error('ModalDispatchContext must be used within a ModalProvider');
  }

  return context;
};

// Provider
const ModalProvider = ({ children }) => {
  const [component, setComponent] = useState();

  const handleOpenModal = (modalComponent) => {
    setComponent(modalComponent);
  };

  const handleCloseModal = (e) => {
    return e.target === e.currentTarget ? setComponent(null) : null;
  };

  const closeEscape = (e) => {
    return e.key === 'Escape' ? setComponent(null) : null;
  };

  const stateValue = useMemo(
    () => ({
      component,
    }),
    [component],
  );

  const dispatchValue = useMemo(
    () => ({
      handleOpenModal,
      handleCloseModal,
      closeEscape,
      setComponent,
    }),
    [handleOpenModal, handleCloseModal, closeEscape, setComponent],
  );

  return (
    <ModalStateContext.Provider value={stateValue}>
      <ModalDispatchContext.Provider value={dispatchValue}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export { useModalStateContext, useModalDispatchContext, ModalProvider };

ModalProvider.propTypes = {
  children: propTypes.node.isRequired,
};
