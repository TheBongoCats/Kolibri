import {
  StableCoinClient,
  Network,
  HarbingerClient,
  OvenClient,
  CONTRACTS,
} from '@hover-labs/kolibri-js';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { useBeaconStateContext } from './beaconContext';

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
  const [myOvensClients, setMyOvensClients] = useState([]);

  const { beaconWalletData, beaconAddress } = useBeaconStateContext();

  const harbingerClient = new HarbingerClient(
    CONSTANTS.NODE_URL,
    'KT1PMQZxQTrFPJn3pEaj9rvGfJA9Hvx7Z1CL',
  );

  const stableCoinClient = new StableCoinClient(
    CONSTANTS.NODE_URL,
    Network.Hangzhou,
    CONTRACTS.TEST.OVEN_REGISTRY,
    CONTRACTS.TEST.MINTER,
    CONTRACTS.TEST.OVEN_FACTORY,
  );

  const getAllMyOvens = async () => {
    const ovens = await stableCoinClient.ovensOwnedByAddress(beaconAddress);

    const ovenClients = await Promise.all(
      ovens.map(async (oven) => {
        return new OvenClient(
          CONSTANTS.NODE_URL,
          beaconWalletData,
          oven,
          stableCoinClient,
          harbingerClient,
        );
      }),
    );

    setMyOvensClients(ovenClients);
  };

  const getOvens = async () => {
    const response = await axios(
      'https://kolibri-data.s3.amazonaws.com/hangzhounet/oven-data.json',
    );

    if (response) {
      console.log(response.data.allOvenData);
      setAllOvens(response.data.allOvenData);
    } else {
      // backup
      const ovens = await stableCoinClient.getAllOvens();

      const ovenClients = await Promise.all(
        ovens.map(async (oven) => {
          return new OvenClient(
            CONSTANTS.NODE_URL,
            beaconWalletData,
            oven.ovenAddress,
            stableCoinClient,
            harbingerClient,
          );
        }),
      );

      const ovensData = await Promise.all(
        ovenClients.map(async (ovenClient) => {
          return {
            baker: await ovenClient.getBaker(),
            balance: await ovenClient.getBalance(),
            borrowedTokens: await ovenClient.getBorrowedTokens(),
            isLiquidated: await ovenClient.isLiquidated(),
            outstandingTokens: await ovenClient.getTotalOutstandingTokens(),
            ovenAddress: await ovenClient.ovenAddress,
            ovenOwner: await ovenClient.getOwner(),
            stabilityFees: await ovenClient.getStabilityFees(),
          };
        }),
      );

      setAllOvens(ovensData);
    }
  };

  const getActualPrice = async () => {
    const result = await harbingerClient.getPriceData();

    setTezosPrice(result);
  };

  const deployOven = async () => {
    if (beaconWalletData) {
      await stableCoinClient
        .deployOven(beaconWalletData)
        .then((result) => console.log(result));
    }
  };

  useEffect(() => {
    getAllMyOvens();
  }, [beaconWalletData]);

  const stateValue = useMemo(
    () => ({
      allOvens,
      tezosPrice,
      myOvensClients,
    }),
    [allOvens, tezosPrice, myOvensClients],
  );

  const dispatchValue = useMemo(
    () => ({
      getOvens,
      getActualPrice,
      getAllMyOvens,
      deployOven,
    }),
    [getOvens, getActualPrice, deployOven, getAllMyOvens],
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
