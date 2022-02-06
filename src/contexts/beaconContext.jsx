import { NetworkType as BeaconNetwork } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import { ReadOnlySigner } from '../utils/ReadOnlySigner.mjs';

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
  const [beaconAdress, setBeaconAdress] = useState();
  const [beaconNet, setBeaconNet] = useState();
  const [beaconBalance, setBeaconBalance] = useState();
  const [beaconTezos, setBeaconTezos] = useState();
  const [beaconPk, setBeaconPk] = useState();
  // const [walletData, setWalletData] = useState();

  const connectWallet = async (forcePermission, network) => {
    const beaconNetwork =
      network === 'hangzhounet'
        ? BeaconNetwork.HANGZHOUNET
        : BeaconNetwork.MAINNET;
    beaconWallet.client.preferredNetwork = beaconNetwork;

    const activeAccount = await beaconWallet.client.getActiveAccount();

    if (forcePermission || !activeAccount) {
      if (activeAccount) {
        await beaconWallet.clearActiveAccount();
      }
      await beaconWallet.requestPermissions({
        network: { type: beaconNetwork },
      });
    }

    const tezos = new TezosToolkit(defaultRpcUrls[beaconNetwork]);
    tezos.setPackerProvider(michelEncoder);
    tezos.setWalletProvider(beaconWallet);
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
        .then((bigNum) => +bigNum / 1000000),
    );

    setBeaconAdress(activeAcc.address);
    setBeaconNet(activeAcc.network.type);
    setBeaconTezos(tezos);
    setBeaconPk(activeAcc.publicKey);
  };

  const dispatchValue = useMemo(
    () => ({
      connectWallet,
    }),
    [connectWallet],
  );

  const stateValue = useMemo(
    () => ({
      beaconAdress,
      beaconNet,
      beaconBalance,
      beaconTezos,
      beaconPk,
    }),
    [beaconAdress, beaconNet, beaconTezos, beaconPk, beaconBalance],
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
