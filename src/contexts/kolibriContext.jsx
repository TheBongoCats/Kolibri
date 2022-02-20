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
import { mutateBigNumber } from '../utils';

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
KolibriDispatchContext.displayName = 'Kolibri dispatch context';

const useKolibriDispatchContext = () => {
  const context = useContext(KolibriDispatchContext);

  if (!context) {
    throw new Error(
      'KolibriDispatchContext must be used within a KolibriProvider',
    );
  }

  return context;
};

// Provider
const KolibriProvider = ({ children }) => {
  const [allOvens, setAllOvens] = useState();
  const [tezosPrice, setTezosPrice] = useState();
  const [myOvens, setMyOvens] = useState([]);
  const [stabilityFeeYear, setStabilityFeeYear] = useState();
  const [collateralRatio, setCollaterlRatio] = useState();

  const { beaconWalletData, beaconAddress } = useBeaconStateContext();

  const harbingerClient = new HarbingerClient(
    CONSTANTS.NODE_URL,
    CONTRACTS.TEST.HARBINGER_NORMALIZER,
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

    const ovensData = await Promise.all(
      ovens.map(async (oven) => {
        const ovenClient = new OvenClient(
          CONSTANTS.NODE_URL,
          beaconWalletData,
          oven,
          stableCoinClient,
          harbingerClient,
        );

        return {
          baker: await ovenClient.getBaker(),
          balance: await ovenClient.getBalance(),
          borrowedTokens: await ovenClient.getBorrowedTokens(),
          isLiquidated: await ovenClient.isLiquidated(),
          outstandingTokens: await ovenClient.getTotalOutstandingTokens(),
          ovenAddress: await ovenClient.ovenAddress,
          ovenOwner: await ovenClient.getOwner(),
          stabilityFees: await ovenClient.getStabilityFees(),
          ovenClient,
        };
      }),
    );

    setMyOvens(ovensData);
  };

  // eslint-disable-next-line consistent-return
  const getOvens = async () => {
    const response = await axios(
      'https://kolibri-data.s3.amazonaws.com/hangzhounet/oven-data.json',
    );

    if (response) {
      setAllOvens(response.data.allOvenData);
      return response.data.allOvenData;
    }
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
  };

  const getActualPrice = async () => {
    const result = await harbingerClient.getPriceData();
    setTezosPrice(result);
  };

  const getStabilityFeeYear = async () => {
    const result = await stableCoinClient.getSimpleStabilityFee();
    setStabilityFeeYear(mutateBigNumber(result, undefined, 1));
  };

  const getCollaterlRatio = async () => {
    const result = await stableCoinClient.getRequiredCollateralizationRatio();
    setCollaterlRatio(mutateBigNumber(result, 1e18, 0));
  };

  const deployOven = async () => {
    if (beaconWalletData) {
      await stableCoinClient.deployOven(beaconWalletData);
    }
  };

  useEffect(() => {
    getAllMyOvens();
  }, [beaconWalletData]);

  useEffect(() => {
    getOvens();
    getStabilityFeeYear();
    getCollaterlRatio();
  }, []);

  useEffect(() => {
    getActualPrice();

    const intervalId = setInterval(() => {
      getActualPrice();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const stateValue = useMemo(
    () => ({
      allOvens,
      tezosPrice,
      myOvens,
      stabilityFeeYear,
      collateralRatio,
    }),
    [allOvens, tezosPrice, myOvens, stabilityFeeYear, collateralRatio],
  );

  const dispatchValue = useMemo(
    () => ({
      getOvens,
      deployOven,
    }),
    [getOvens, deployOven],
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
