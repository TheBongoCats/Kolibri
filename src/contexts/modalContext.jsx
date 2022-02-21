import { createContext, useContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';

// state context
const OvenModalStateContext = createContext({});
OvenModalStateContext.displayName = 'OvenModalStateContext';

const useOvenModalStateContext = () => {
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

const useOvenModalDispatchContext = () => {
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
  const [modalId, setModalId] = useState('');
  const [ovenData, setOvenData] = useState({});

  const handleOpenModal = (section, data) => {
    setOvenData(data);
    setModalId(section);
  };

  const handleCloseModal = (e) => {
    return e?.target === e?.currentTarget ? setModalId('') : null;
  };

  const stateValue = useMemo(
    () => ({
      modalId,
      ovenData,
    }),
    [modalId, ovenData],
  );

  const dispatchValue = useMemo(
    () => ({
      handleOpenModal,
      handleCloseModal,
      setModalId,
      setOvenData,
    }),
    [handleOpenModal, handleCloseModal, setModalId, setOvenData],
  );

  return (
    <OvenModalStateContext.Provider value={stateValue}>
      <OvenModalDispatchContext.Provider value={dispatchValue}>
        {children}
      </OvenModalDispatchContext.Provider>
    </OvenModalStateContext.Provider>
  );
};

export {
  useOvenModalStateContext,
  useOvenModalDispatchContext,
  OvenModalProvider,
};

OvenModalProvider.propTypes = {
  children: propTypes.node.isRequired,
};
