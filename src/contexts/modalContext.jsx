import { createContext, useContext, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { useKolibriDispatchContext } from './kolibriContext';

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
  const [ovenLoadingFunc, setOvenLoadingFunc] = useState();
  const { getDataFromAddress, setMyOvens } = useKolibriDispatchContext();

  const handleOpenModal = (section, data, setLoading) => {
    setOvenData(data);
    setModalId(section);
    setOvenLoadingFunc(() => setLoading);
  };

  const handleCloseModal = (e) => {
    return e?.target === e?.currentTarget ? setModalId('') : null;
  };

  const ovenAction = async (callback) => {
    try {
      ovenLoadingFunc(true);
      const transaction = await callback();
      setModalId('');
      await transaction.confirmation();

      const newData = await getDataFromAddress(ovenData.ovenAddress);

      setMyOvens((prevState) => {
        return prevState.map((oven) => {
          return oven.ovenAddress === newData.ovenAddress ? newData : oven;
        });
      });

      ovenLoadingFunc(false);
    } catch {
      console.log('error');
      ovenLoadingFunc(false);
    }
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
      ovenAction,
    }),
    [handleOpenModal, handleCloseModal, setModalId, setOvenData, ovenAction],
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
