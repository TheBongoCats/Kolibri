import { TempleWallet } from '@temple-wallet/dapp';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import { createContext, useContext, useMemo, useState } from 'react';
import { ReadOnlySigner } from '../utils/ReadOnlySigner';

const michelEncoder = new MichelCodecPacker();

// state context

// @ts-ignore
const TempleWalletStateContext = createContext();
TempleWalletStateContext.displayName = 'templeWalletStateContext';

const useTempleWalletStateContex = () => {
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

// eslint-disable-next-line react/prop-types
// @ts-ignore
// eslint-disable-next-line react/prop-types
const TempleWalletProvider = ({ children }) => {
  const [templeAdress, setTempleAdress] = useState();
  const [templePublickKey, setTemplePublickKey] = useState();
  const [templeWalletResponse, setTempleWalletResponse] = useState();
  const [templeBalnce, settempleBalnce] = useState();
  const connectTempleWallet = async (
    forcePermissions: boolean,
    network: string,
  ) => {
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
      // @ts-ignore
      await wallet.connect(network, { forcePermission: true });
    }

    const tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

    tezos.setWalletProvider(wallet);
    tezos.setPackerProvider(michelEncoder);

    const pkh = wallet.connected ? await wallet.getPKH() : undefined;

    let pk;

    if (wallet.connected && pkh) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { pkh, publicKey } = wallet.permission!;
      pk = publicKey;
      tezos.setSignerProvider(new ReadOnlySigner(pkh, publicKey));
    } else {
      throw new Error('Wallet was not connected');
    }

    // @ts-ignore
    setTempleAdress(pkh);
    // @ts-ignore
    setTempleWalletResponse(wallet);
    // @ts-ignore
    setTemplePublickKey(pk);
    settempleBalnce(
      // @ts-ignore

      await tezos.tz.getBalance(pkh).then((bigNum) => +bigNum / 1000000),
    );
  };

  const stateValue = useMemo(
    () => ({
      templeAdress,
      templeWalletResponse,
      templePublickKey,
      templeBalnce,
    }),
    [templeAdress, templeWalletResponse, templePublickKey, templeBalnce],
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
  useTempleWalletStateContex,
  useTempleWalletDispatchContex,
  TempleWalletProvider,
};
