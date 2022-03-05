import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';

// state context
const I18nStateContext = createContext({});
I18nStateContext.displayName = 'i18n state context';

const useI18nStateContext = () => {
  const context = useContext(I18nStateContext);

  if (!context) {
    throw new Error('I18nStateContext must be used within a I18nProvider');
  }

  return context;
};

// dispatch context
const I18nDispatchContext = createContext({});
I18nDispatchContext.displayName = 'I18nDispatchContext';

const useI18nDispatchContext = () => {
  const context = useContext(I18nDispatchContext);

  if (!context) {
    throw new Error('I18nDispatchContext must be used within a I18nProvider');
  }

  return context;
};

// Provider
const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  let handleSetLang;

  try {
    const storage = localStorage;

    handleSetLang = (newLang) => {
      setLang(newLang);
      storage.setItem('lang', newLang);
    };

    useEffect(() => {
      const storageLang = storage.getItem('lang');

      return storageLang ? setLang(storageLang) : storage.setItem('lang', 'en');
    }, []);
  } catch {
    handleSetLang = (newLang) => setLang(newLang);
  }

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
    <I18nStateContext.Provider value={stateValue}>
      <I18nDispatchContext.Provider value={dispatchValue}>
        {children}
      </I18nDispatchContext.Provider>
    </I18nStateContext.Provider>
  );
};

export { useI18nStateContext, useI18nDispatchContext, I18nProvider };

I18nProvider.propTypes = {
  children: propTypes.node.isRequired,
};
