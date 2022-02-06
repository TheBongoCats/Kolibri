import { TempleWallet } from '@temple-wallet/dapp';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import propTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import { ReadOnlySigner } from '../utils/ReadOnlySigner.mjs';

const michelEncoder = new MichelCodecPacker();

// state context

const TempleWalletStateContext = createContext();
TempleWalletStateContext.displayName = 'templeWalletStateContext';

const useTempleWalletStateContext = () => {
  const context = useContext(TempleWalletStateContext);

  if (!context) {
    throw new Error(
      'templeWalletStateContext must be used within a TempleWalletProvider',
    );
  }

  return context;
};

// @ts-ignore
const TempleWalletDispatchContext = createContext();
TempleWalletDispatchContext.displayName = 'templeWalletDispatchContext';

const useTempleWalletDispatchContex = () => {
  const context = useContext(TempleWalletDispatchContext);

  if (!context) {
    throw new Error(
      'templeWalletDispatchContext must be used within a TempleWalletProvider',
    );
  }

  return context;
};

const TempleWalletProvider = ({ children }) => {
  const [templeAdress, setTempleAdress] = useState();
  const [templePublickKey, setTemplePublickKey] = useState();
  const [templeWalletResponse, setTempleWalletResponse] = useState();
  const [templeBalance, setTempleBalance] = useState();

  const connectTempleWallet = async (forcePermissions, network) => {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Wallet isn't available");
    }

    let perm;

    if (!forcePermissions) {
      perm = await TempleWallet.getCurrentPermission();
    }

    const wallet = new TempleWallet('Kolibri', perm);

    if (!wallet.connected) {
      await wallet.connect(network, { forcePermission: true });
    }

    const tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

    tezos.setWalletProvider(wallet);
    tezos.setPackerProvider(michelEncoder);

    const pkh = wallet.connected ? await wallet.getPKH() : undefined;

    let pk;

    if (wallet.connected && pkh) {
      // eslint-disable-next-line no-shadow
      const { pkh, publicKey } = wallet.permission;
      pk = publicKey;
      tezos.setSignerProvider(new ReadOnlySigner(pkh, publicKey));
    } else {
      throw new Error('Wallet was not connected');
    }

    const balance = await tezos.tz
      .getBalance(pkh)
      .then((bigNum) => +bigNum / 1000000);

    setTempleAdress(pkh);
    setTempleWalletResponse(wallet);
    setTemplePublickKey(pk);
    setTempleBalance(balance);
  };

  const stateValue = useMemo(
    () => ({
      templeAdress,
      templeWalletResponse,
      templePublickKey,
      templeBalance,
    }),
    [templeAdress, templeWalletResponse, templePublickKey, templeBalance],
  );

  const dispatchValue = useMemo(
    () => ({
      connectTempleWallet,
    }),
    [connectTempleWallet],
  );

  return (
    <TempleWalletStateContext.Provider value={stateValue}>
      <TempleWalletDispatchContext.Provider value={dispatchValue}>
        {children}
      </TempleWalletDispatchContext.Provider>
    </TempleWalletStateContext.Provider>
  );
};

export {
  useTempleWalletStateContext,
  useTempleWalletDispatchContex,
  TempleWalletProvider,
};

TempleWalletProvider.propTypes = {
  children: propTypes.node.isRequired,
};
