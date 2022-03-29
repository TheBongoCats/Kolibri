import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import propTypes from 'prop-types';
import { useKolibriStateContext } from './kolibriContext';
import { isDesktop, mutateBigNumber } from '../utils';

// state context
const PushStateContext = createContext({});
PushStateContext.displayName = 'PushStateContext';

const usePushStateContext = () => {
  const context = useContext(PushStateContext);

  if (!context) {
    throw new Error('PushStateContext must be used within a PushProvider');
  }

  return context;
};

// dispatch context
const PushDispatchContext = createContext({});
PushDispatchContext.displayName = 'PushDispatchContext';

const usePushDispatchContext = () => {
  const context = useContext(PushDispatchContext);

  if (!context) {
    throw new Error('PushDispatchContext must be used within a PushProvider');
  }

  return context;
};

// Provider
const PushProvider = ({ children }) => {
  const { tezosPrice } = useKolibriStateContext();
  const [permission, setPermission] = useState(false);
  const [notifyOracle, setNotifyOracle] = useState(false);
  const firstUpdate = useRef(true);
  const desktop = isDesktop();

  const requestPermission = () => {
    if (desktop) {
      return Notification.requestPermission();
    }
    return () => null;
  };

  let handleSetNotify;

  try {
    const storage = localStorage;

    handleSetNotify = () => {
      if (permission) {
        setNotifyOracle(!notifyOracle);
        storage.setItem('oracleNotify', !notifyOracle);
      } else {
        requestPermission();
      }
    };

    useEffect(() => {
      const storageOracleNotify = JSON.parse(storage.getItem('oracleNotify'));

      return storageOracleNotify
        ? setNotifyOracle(storageOracleNotify)
        : storage.setItem('oracleNotify', false);
    }, []);
  } catch {
    handleSetNotify = () => {
      if (permission) {
        setNotifyOracle(!notifyOracle);
      } else {
        requestPermission();
      }
    };
  }

  useEffect(() => {
    if (tezosPrice) {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      if (notifyOracle) {
        // eslint-disable-next-line no-new
        new Notification('Hey! Kolibri Oracle has updated!', {
          body: `New XTZ/USD price is ${mutateBigNumber(tezosPrice.price)}$`,
        });
      }
    }
  }, [tezosPrice]);

  useEffect(() => {
    if (desktop) {
      setPermission(Notification.permission === 'granted');
    }
  }, []);

  const stateValue = useMemo(
    () => ({ permission, notifyOracle }),
    [permission, notifyOracle],
  );

  const dispatchValue = useMemo(
    () => ({ requestPermission, handleSetNotify }),
    [requestPermission, handleSetNotify],
  );

  return (
    <PushStateContext.Provider value={stateValue}>
      <PushDispatchContext.Provider value={dispatchValue}>
        {children}
      </PushDispatchContext.Provider>
    </PushStateContext.Provider>
  );
};

export { usePushStateContext, usePushDispatchContext, PushProvider };

PushProvider.propTypes = {
  children: propTypes.node.isRequired,
};
