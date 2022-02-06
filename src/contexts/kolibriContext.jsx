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

  const ovenClient = new OvenClient(
    NODE_URL,
    templeWalletResponse,
    'KT1VXhDpn5sqQEmhS2H3wmGALVimkLcD9AKH',
    stableCoinClient,
    harbingerClient,
  );

  const getOvenBalance = () => {
    ovenClient
      .getBalance()
      .then((result) => result)
      .then((result) => setBalance(+result));
  };

  const deposit = () => ovenClient.deposit(new BigNumber(1 * MUTEZ_IN_TEZOS));
  const withdraw = () => ovenClient.withdraw(new BigNumber(5 * MUTEZ_IN_TEZOS));

  const getOvens = () => {
    stableCoinClient
      .getAllOvens()
      .then((response) => response)
      .then((ovens) => setAllOvens(ovens));
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
    }),
    [allOvens, tezosPrice, tezosPriceDate],
  );

  const dispatchValue = useMemo(
    () => ({
      getOvens,
      getActualPrice,
      deployOven,
      getOvenBalance,
      deposit,
      withdraw,
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
