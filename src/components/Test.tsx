import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../contexts/beaconContext';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../contexts/kolibriContext';

import {
  useTempleWalletDispatchContex,
  useTempleWalletStateContex,
} from './templeWalletContext';

const Test = () => {
  // @ts-ignore
  const { connectWallet } = useBeaconDispatchContext();
  // @ts-ignore
  const { beaconAdress, beaconNet, beaconBalance, beaconTezos, beaconPk } =
    useBeaconStateContext();
  // @ts-ignore
  const { getOvens, getActualPrice } = useKolibriDispatchContext();
  // @ts-ignore
  const { allOwens, tezosPrice, tezosPriceDate } = useKolibriStateContext();
  // @ts-ignore
  const { templeAdress } = useTempleWalletStateContex();
  // @ts-ignore
  const { connectTempleWallet } = useTempleWalletDispatchContex();
  return (
    <>
      <button onClick={() => connectWallet(true, 'hangzhounet')} type="button">
        Connect Wallet
      </button>
      <button onClick={getOvens} type="button">
        Show ovens
      </button>
      <button onClick={getActualPrice} type="button">
        Get tezos price
      </button>
      <button
        onClick={() => connectTempleWallet(true, 'hangzhounet')}
        type="button"
      >
        Connect Temple Wallet
      </button>
      {beaconTezos && (
        <div>
          <div>{`Your address: ${beaconAdress}`}</div>
          <div>{`Your network: ${beaconNet}`}</div>
          <div>{`Your public key: ${beaconPk}`}</div>
          <div>{`Your balance: ${beaconBalance}`}</div>
        </div>
      )}
      {templeAdress && <div>{templeAdress}</div>}
      {allOwens && <div>{allOwens.length}</div>}
      {tezosPrice && (
        <div>{`date: ${tezosPriceDate}, price: ${tezosPrice}`}</div>
      )}
    </>
  );
};

export default Test;
