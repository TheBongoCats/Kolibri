import {
  StableCoinClient,
  Network,
  HarbingerClient,
  OvenClient,
  CONTRACTS,
} from '@hover-labs/kolibri-js';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { useTempleWalletStateContext } from './templeWalletContext';
import { NODE_URL, MUTEZ_IN_TEZOS } from '../utils/constants';

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

const KolibriProvider = ({ children }) => {
  const [allOvens, setAllOvens] = useState();
  const [tezosPrice, setTezosPrice] = useState();
  const [balance, setBalance] = useState();
  const [tezosPriceDate, setTezosPriceDate] = useState();
  const [myOvens, setMyOvens] = useState([]);
  const { templeWalletResponse } = useTempleWalletStateContext();

  const harbingerClient = new HarbingerClient(
    NODE_URL,
    'KT1PMQZxQTrFPJn3pEaj9rvGfJA9Hvx7Z1CL',
  );

  const stableCoinClient = new StableCoinClient(
    NODE_URL,
    Network.Hangzhou,
    CONTRACTS.TEST.OVEN_REGISTRY,
    CONTRACTS.TEST.MINTER,
    CONTRACTS.TEST.OVEN_FACTORY,
  );

  const ovenClientTest = new OvenClient(
    NODE_URL,
    templeWalletResponse,
    'KT1AsuBApwJLwzzu5MwTe6KBr7zswZ9tJXy3',
    stableCoinClient,
    harbingerClient,
  );

  const getAllMyOvens = async () => {
    const ovens = await stableCoinClient.ovensOwnedByAddress(
      'tz1LN3hTUtg8eohArm2T1S4wwxbbrY4umr3a',
    );

    // setMyOvens(
    //   await Promise.all(
    //     ovens.map(async (oven) => {
    //       const ovenClient = new OvenClient(
    //         NODE_URL,
    //         templeWalletResponse,
    //         oven,
    //         stableCoinClient,
    //         harbingerClient,
    //       );

    //       return {
    //         address: ovenClient.ovenAddress,
    //         baker: await ovenClient.getBaker(),
    //         withdraw: ovenClient.withdraw,
    //       };
    //     }),
    //   ),
    // );

    setMyOvens(
      await Promise.all(
        ovens.map(async (oven) => {
          return new OvenClient(
            NODE_URL,
            templeWalletResponse,
            oven,
            stableCoinClient,
            harbingerClient,
          );
        }),
      ),
    );

    console.log(myOvens);
  };

  const getOvenBalance = () => {
    ovenClientTest
      .getBalance()
      .then((result) => result)
      .then((result) => setBalance(+result));
  };

  const deposit = () =>
    ovenClientTest.deposit(new BigNumber(1 * MUTEZ_IN_TEZOS));
  const withdraw = () =>
    ovenClientTest.withdraw(new BigNumber(5 * MUTEZ_IN_TEZOS));

  const getOvens = () => {
    stableCoinClient.getAllOvens().then((ovens) => setAllOvens(ovens));
  };

  const getActualPrice = async () => {
    await harbingerClient
      .getPriceData()
      .then((response) => response)
      .then((result) => {
        console.log(result);
        setTezosPrice(+result.price / 1000000);
        setTezosPriceDate(result.time);
      });
  };

  const deployOven = async () => {
    if (templeWalletResponse) {
      await stableCoinClient
        .deployOven(templeWalletResponse)
        .then((result) => console.log(result));
    }
  };

  const stateValue = useMemo(
    () => ({
      allOvens,
      tezosPrice,
      tezosPriceDate,
      balance,
      myOvens,
    }),
    [allOvens, tezosPrice, tezosPriceDate, balance, myOvens],
  );

  const dispatchValue = useMemo(
    () => ({
      getOvens,
      getActualPrice,
      deployOven,
      getOvenBalance,
      deposit,
      withdraw,
      getAllMyOvens,
    }),
    [getOvens, getActualPrice, deployOven, getOvenBalance],
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

KolibriProvider.propTypes = {
  children: propTypes.node.isRequired,
};
