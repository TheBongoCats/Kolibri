import { createContext, useContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
// import { useKolibriDispatchContext } from './kolibriContext';

// state context
const OvenModalStateContext = createContext({});
OvenModalStateContext.displayName = 'OvenModalStateContext';

const useModalStateContext = () => {
  const context = useContext(OvenModalStateContext);

  if (!context) {
    throw new Error(
      'OvenModalStateContext must be used within a OvenModalProvider',
    );
  }

  return context;
};

// dispatch context
const OvenModalDispatchContext = createContext({});
OvenModalDispatchContext.displayName = 'OvenModalDispatchContext';

const useModalDispatchContext = () => {
  const context = useContext(OvenModalDispatchContext);

  if (!context) {
    throw new Error(
      'OvenModalDispatchContext must be used within a OvenModalProvider',
    );
  }

  return context;
};

// Provider
const OvenModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState();

  const handleOpenModal = (modalComponent) => {
    setComponent(modalComponent);
    setIsOpen(true);
  };

  const handleCloseModal = (e) => {
    return e.target === e.currentTarget ? setIsOpen(false) : null;
  };

  const closeEscape = (e) => {
    return e.key === 'Escape' ? setIsOpen(false) : null;
  };

  const stateValue = useMemo(
    () => ({
      isOpen,
      component,
    }),
    [isOpen, component],
  );

  const dispatchValue = useMemo(
    () => ({
      handleOpenModal,
      handleCloseModal,
      closeEscape,
      setIsOpen,
    }),
    [handleOpenModal, handleCloseModal, closeEscape, setIsOpen],
  );

  return (
    <OvenModalStateContext.Provider value={stateValue}>
      <OvenModalDispatchContext.Provider value={dispatchValue}>
        {children}
      </OvenModalDispatchContext.Provider>
    </OvenModalStateContext.Provider>
  );
};

export { useModalStateContext, useModalDispatchContext, OvenModalProvider };

OvenModalProvider.propTypes = {
  children: propTypes.node.isRequired,
};
