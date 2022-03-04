import { createContext, useContext, useEffect, useMemo } from 'react';
import propTypes from 'prop-types';

// state context
const PushStateContext = createContext({});
PushStateContext.displayName = 'pushStateContext';

const usePushStateContext = () => {
  const context = useContext(PushStateContext);

  if (!context) {
    throw new Error('pushStateContext must be used within a PushProvider');
  }

  return context;
};

// dispatch context
const PushDispatchContext = createContext({});
PushDispatchContext.displayName = 'pushDispatchContext';

const usePushDispatchContext = () => {
  const context = useContext(PushDispatchContext);

  if (!context) {
    throw new Error('pushDispatchContext must be used within a PushProvider');
  }

  return context;
};

// Provider
const PushProvider = ({ children }) => {
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission((result) => {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then((permissionResult) => {
      if (permissionResult !== 'granted') {
        throw new Error('Permission not granted.');
      }
    });
  };

  function subscribeUserToPush() {
    return navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: btoa(
            'BKnGSV001HiVKlKcR88lVjL0J1EYv0iIBqzKvLhzrHA_Mgwo_6G4B3zT7sQiDXP1rs9cAaDWfDQdE66pjj0b5yc',
          ),
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then((pushSubscription) => {
        console.log('PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
      });
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      // Браузер не поддерживает сервис-воркеры.
      return null;
    }

    requestPermission();
  }, []);

  const stateValue = useMemo(
    () => ({
      lang,
    }),
    [lang],
  );

  const dispatchValue = useMemo(
    () => ({
      handleSetLang,
    }),
    [handleSetLang],
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
