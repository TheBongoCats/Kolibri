import {
  // HarbingerClient,
  StableCoinClient,
  Network,
  HarbingerClient,
} from '@hover-labs/kolibri-js';
import { createContext, useContext, useMemo, useState } from 'react';

// state context
const KolibriStateContext = createContext({});
KolibriStateContext.displayName = 'Kolibri state context';

const useKolibriStateContext = () => {
  const context = useContext(KolibriStateContext);

  if (!context) {
    throw new Error(
      'KolibriStateContext must be used within a KolibriProvider',
    );
  }

  return context;
};

// dispatch context
const KolibriDispatchContext = createContext({});
KolibriDispatchContext.displayName = 'Kolibri state context';

const useKolibriDispatchContext = () => {
  const context = useContext(KolibriDispatchContext);

  if (!context) {
    throw new Error(
      'KolibriDispatchContext must be used within a KolibriProvider',
    );
  }

  return context;
};

// @ts-ignore
// eslint-disable-next-line react/prop-types
const KolibriProvider = ({ children }) => {
  const [allOwens, setAllOwens] = useState();
  const [tezosPrice, setTezosPrice] = useState();
  const [tezosPriceDate, setTezosPriceDate] = useState();

  const harbingerClient = new HarbingerClient(
    'https://hangzhounet.api.tez.ie',
    'KT1PMQZxQTrFPJn3pEaj9rvGfJA9Hvx7Z1CL',
  );

  const stableCoinClient = new StableCoinClient(
    'https://hangzhounet.api.tez.ie',
    Network.Hangzhou,
    'KT1U4dr4RHRWBTUQ9Fj63k78RYNB4diqvMUy',
    'KT1ECitbrVyYeVQJQXC8CLpyGsumSXNjm72R',
    'KT1QAiqr7TfMvQu1g7DCBoHnR6mEsRD6UstC',
  );

  const getOvens = async () => {
    await stableCoinClient
      .getAllOvens()
      .then((response) => response)
      // @ts-ignore
      .then((ovens) => setAllOwens(ovens));
  };

  const getActualPrice = async () => {
    await harbingerClient
      .getPriceData()
      .then((responce) => responce)
      .then((result) => {
        // @ts-ignore
        setTezosPrice(+result.price / 1000000);
        // @ts-ignore
        setTezosPriceDate(result.time);
      });
  };

  const stateValue = useMemo(
    () => ({
      allOwens,
      tezosPrice,
      tezosPriceDate,
    }),
    [allOwens, tezosPrice, tezosPriceDate],
  );

  const dispatchValue = useMemo(
    () => ({
      getOvens,
      getActualPrice,
    }),
    [getOvens, getActualPrice],
  );

  return (
    <KolibriStateContext.Provider value={stateValue}>
      <KolibriDispatchContext.Provider value={dispatchValue}>
        {children}
      </KolibriDispatchContext.Provider>
    </KolibriStateContext.Provider>
  );
};

export { useKolibriStateContext, useKolibriDispatchContext, KolibriProvider };
