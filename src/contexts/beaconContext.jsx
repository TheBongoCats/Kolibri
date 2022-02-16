import { NetworkType as BeaconNetwork } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ReadOnlySigner } from '../utils/ReadOnlySigner.mjs';
import CONSTANTS from '../utils/constants';

const { MUTEZ_IN_TEZOS } = CONSTANTS;

const APP_NAME = 'Kolibri';

const defaultRpcUrls = {
  hangzhounet: 'https://hangzhounet.api.tez.ie',
};

const beaconWallet = new BeaconWallet({
  name: APP_NAME,
  iconUrl: `${process.env.REACT_APP_BASE_URL}/favicon.ico`,
});

const michelEncoder = new MichelCodecPacker();

// state context
const BeaconStateContext = createContext({});
BeaconStateContext.displayName = 'Beacon state context';

const useBeaconStateContext = () => {
  const context = useContext(BeaconStateContext);

  if (!context) {
    throw new Error('BeaconStateContext must be used within a BeaconProvider');
  }

  return context;
};

// dispatch context
const BeaconDispatchContext = createContext({});
BeaconDispatchContext.displayName = 'Beacon dispatch context';

const useBeaconDispatchContext = () => {
  const context = useContext(BeaconDispatchContext);

  if (!context) {
    throw new Error(
      'BeaconDispatchContext must be used within a BeaconProvider',
    );
  }

  return context;
};

const BeaconProvider = ({ children }) => {
  const [beaconAddress, setBeaconAddress] = useState();
  const [beaconNet, setBeaconNet] = useState();
  const [beaconBalance, setBeaconBalance] = useState();
  const [beaconTezos, setBeaconTezos] = useState();
  const [beaconPk, setBeaconPk] = useState();
  const [beaconWalletData, setBeaconWalletData] = useState();
  const [isLogin, setIsLogin] = useState(false);

  // eslint-disable-next-line consistent-return

  const beaconNetwork = BeaconNetwork.HANGZHOUNET;

  const tezos = new TezosToolkit(defaultRpcUrls[beaconNetwork]);
  tezos.setPackerProvider(michelEncoder);
  tezos.setWalletProvider(beaconWallet);

  useEffect(async () => {
    const activeAccount = await beaconWallet.client.getActiveAccount();

    if (activeAccount) {
      setIsLogin(true);
      setBeaconAddress(activeAccount.address);
      setBeaconNet(activeAccount.network.type);
      setBeaconTezos(tezos);
      setBeaconPk(activeAccount.publicKey);
      setBeaconWalletData(beaconWallet);
      setBeaconBalance(
        await tezos.tz
          .getBalance(activeAccount.address)
          .then((bigNum) => +bigNum / MUTEZ_IN_TEZOS),
      );
    } else {
      setIsLogin(false);
    }
  }, []);

  // eslint-disable-next-line consistent-return
  const connectWallet = async (forcePermission) => {
    beaconWallet.client.preferredNetwork = beaconNetwork;

    const activeAccount = await beaconWallet.client.getActiveAccount();

    if (forcePermission || !activeAccount) {
      if (activeAccount) {
        setIsLogin(true);
        return activeAccount;
      }
      await beaconWallet.requestPermissions({
        network: { type: beaconNetwork },
      });
    }

    const activeAcc = await beaconWallet.client.getActiveAccount();
    if (!activeAcc) {
      throw new Error("Wallet wasn't connected");
    }

    tezos.setSignerProvider(
      new ReadOnlySigner(activeAcc.address, activeAcc.publicKey),
    );

    setBeaconBalance(
      await tezos.tz
        .getBalance(activeAcc.address)
        .then((bigNum) => +bigNum / MUTEZ_IN_TEZOS),
    );

    setBeaconAddress(activeAcc.address);
    setBeaconNet(activeAcc.network.type);
    setBeaconTezos(tezos);
    setBeaconPk(activeAcc.publicKey);
    setBeaconWalletData(beaconWallet);
    setIsLogin(true);
  };

  const disconnectWallet = async () => {
    await beaconWallet.clearActiveAccount();
    setIsLogin(false);
  };

  const dispatchValue = useMemo(
    () => ({
      connectWallet,
      disconnectWallet,
    }),
    [connectWallet, disconnectWallet],
  );

  const stateValue = useMemo(
    () => ({
      beaconAddress,
      beaconNet,
      beaconBalance,
      beaconTezos,
      beaconPk,
      beaconWalletData,
      isLogin,
    }),
    [
      beaconAddress,
      beaconNet,
      beaconTezos,
      beaconPk,
      beaconBalance,
      beaconWalletData,
      isLogin,
    ],
  );

  return (
    <BeaconStateContext.Provider value={stateValue}>
      <BeaconDispatchContext.Provider value={dispatchValue}>
        {children}
      </BeaconDispatchContext.Provider>
    </BeaconStateContext.Provider>
  );
};

export { useBeaconStateContext, useBeaconDispatchContext, BeaconProvider };

BeaconProvider.propTypes = {
  children: propTypes.node.isRequired,
};
