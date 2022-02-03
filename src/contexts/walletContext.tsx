import { NetworkType as BeaconNetwork } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
import { TempleWallet } from '@temple-wallet/dapp';
import { ReadOnlySigner } from '../utils/ReadOnlySigner';

export interface DAppConnection {
  type: 'temple' | 'beacon';
  pkh: string;
  pk: string;
  tezos: TezosToolkit;
  balance: number;
  templeWallet?: TempleWallet;
}

type Network = 'hangzhounet';

const APP_NAME = 'Kolibri';

const defaultRpcUrls = {
  hangzhounet: 'https://hangzhounet.api.tez.ie',
};

const beaconWallet = new BeaconWallet({
  name: APP_NAME,
  iconUrl: `${process.env.REACT_APP_BASE_URL}/favicon.ico`,
});

const michelEncoder = new MichelCodecPacker();

export const connectWallet = async (
  forcePermission: boolean,
  network: Network,
): Promise<DAppConnection> => {
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
    await beaconWallet.requestPermissions({ network: { type: beaconNetwork } });
  }

  // @ts-ignore
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
  const amount = await tezos.tz.getBalance(activeAcc.address);

  return {
    type: 'beacon',
    pkh: activeAcc.address,
    pk: activeAcc.publicKey,
    balance: amount.toNumber(),
    tezos,
  };
};
