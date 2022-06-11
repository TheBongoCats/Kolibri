import {
  StableCoinClient,
  Network,
  HarbingerClient,
  OvenClient,
  CONTRACTS,
  TokenClient,
} from '@hover-labs/kolibri-js';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import CONSTANTS from '../utils/constants';
import { useBeaconStateContext } from './beaconContext';
import { getRateForSwap, mutateBigNumber } from '../utils/helpers';
import { useErrorState } from './errorContext';

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
  const [allOvens, setAllOvens] = useState([]);
  const [tezosPrice, setTezosPrice] = useState();
  const [kUSDPrice, setkUSDPrice] = useState();
  const [myOvens, setMyOvens] = useState([]);
  const [myTokens, setMyTokens] = useState();
  const [stabilityFeeYear, setStabilityFeeYear] = useState();
  const [collateralRatio, setCollaterlRatio] = useState();

  const { beaconWalletData, beaconAddress, tezos } = useBeaconStateContext();
  const { addError } = useErrorState();

  const harbingerClient = new HarbingerClient(
    CONSTANTS.NODE_URL,
    CONTRACTS.MAIN.HARBINGER_NORMALIZER,
  );

  const stableCoinClient = new StableCoinClient(
    CONSTANTS.NODE_URL,
    Network.Mainnet,
    CONTRACTS.MAIN.OVEN_REGISTRY,
    CONTRACTS.MAIN.MINTER,
    CONTRACTS.MAIN.OVEN_FACTORY,
  );

  const tokenClient = new TokenClient(CONSTANTS.NODE_URL, CONTRACTS.MAIN.TOKEN);

  const getDataFromAddress = async (ovenAddress) => {
    const ovenClient = new OvenClient(
      CONSTANTS.NODE_URL,
      beaconWalletData,
      ovenAddress,
      stableCoinClient,
      harbingerClient,
    );

    return {
      baker: await ovenClient.getBaker(),
      balance: await ovenClient.getBalance(),
      borrowedTokens: await ovenClient.getBorrowedTokens(),
      isLiquidated: await ovenClient.isLiquidated(),
      outstandingTokens: await ovenClient.getTotalOutstandingTokens(),
      ovenAddress: ovenClient.ovenAddress,
      ovenOwner: await ovenClient.getOwner(),
      stabilityFees: await ovenClient.getStabilityFees(),
      loading: false,
      ovenClient,
    };
  };

  const getMyOvens = async () => {
    try {
      const ovens = await stableCoinClient.ovensOwnedByAddress(beaconAddress);
      setMyOvens(
        ovens.map((oven) => ({
          ovenAddress: oven,
          loading: true,
        })),
      );
      const ovensData = await Promise.all(
        ovens.map(async (ovenAddress) => {
          return getDataFromAddress(ovenAddress);
        }),
      );

      setMyOvens(ovensData);
    } catch {
      setMyOvens([]);
      addError("ERROR: We can't load your ovens");
    }
  };

  const getAllOvens = async () => {
    try {
      const response = await axios(
        'https://kolibri-data.s3.amazonaws.com/mainnet/oven-data.json',
      );
      setAllOvens(response.data.allOvenData);
    } catch {
      addError("ERROR: We can't load all ovens");
    }
  };

  const getKUSDTokens = async () => {
    try {
      const result = await tokenClient.getBalance(beaconAddress);
      setMyTokens(result);
    } catch {
      setMyTokens(0);
      addError("ERROR: We can't load your kUSD tokens");
    }
  };

  const getActualPrice = async () => {
    try {
      const result = await harbingerClient.getPriceData();
      setTezosPrice(result);
    } catch {
      setTezosPrice(0);
      addError("ERROR: We can't get actual price");
    }
  };

  const updateActualPrice = async () => {
    const result = await harbingerClient.getPriceData();

    if (+tezosPrice.time !== +result.time) {
      setTezosPrice(result);
    }
  };

  const getStabilityFeeYear = async () => {
    try {
      const result = await stableCoinClient.getStabilityFeeApy();
      setStabilityFeeYear(mutateBigNumber(result));
    } catch {
      setStabilityFeeYear('0.00');
      addError("ERROR: We can't get stability fee");
    }
  };

  const getCollateralRatio = async () => {
    try {
      const result = await stableCoinClient.getRequiredCollateralizationRatio();
      setCollaterlRatio(mutateBigNumber(result, CONSTANTS.KOLIBRI_IN_TEZOS, 0));
    } catch {
      setCollaterlRatio('0');
      addError("ERROR: We can't get collateral ration");
    }
  };

  const deployOven = async () => {
    await stableCoinClient.deployOven(beaconWalletData);
  };

  const getkUSDNormalPrice = async () => {
    try {
      const rateForSwap = await getRateForSwap(tezos);

      if (rateForSwap) {
        const price = mutateBigNumber((tezosPrice.price * 1e6) / rateForSwap);

        setkUSDPrice(price);
      } else {
        setkUSDPrice({ full: 0, decimal: '0.00' });
      }
    } catch {
      setkUSDPrice(0);
    }
  };

  useEffect(() => {
    (async () => {
      if (beaconWalletData) {
        getKUSDTokens();
      }
      getStabilityFeeYear();
      getCollateralRatio();
      await getActualPrice();
      getAllOvens();
      if (beaconWalletData) {
        getMyOvens();
      }
    })();
  }, [beaconWalletData]);

  useEffect(() => {
    getkUSDNormalPrice();
    const intervalId = setInterval(() => {
      updateActualPrice();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [tezosPrice]);

  const stateValue = useMemo(
    () => ({
      allOvens,
      tezosPrice,
      myOvens,
      stabilityFeeYear,
      collateralRatio,
      myTokens,
      kUSDPrice,
    }),
    [
      allOvens,
      tezosPrice,
      myOvens,
      stabilityFeeYear,
      collateralRatio,
      myTokens,
      kUSDPrice,
    ],
  );

  const dispatchValue = useMemo(
    () => ({
      deployOven,
      getDataFromAddress,
      setMyOvens,
      getKUSDTokens,
    }),
    [deployOven, getDataFromAddress, setMyOvens, getKUSDTokens],
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
