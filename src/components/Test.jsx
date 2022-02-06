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
  useTempleWalletStateContext,
} from '../contexts/templeWalletContext';
import Oven from './Oven';

const Test = () => {
  const { connectWallet } = useBeaconDispatchContext();
  const { beaconAdress, beaconNet, beaconBalance, beaconTezos, beaconPk } =
    useBeaconStateContext();
  const {
    getOvens,
    deployOven,
    getOvenBalance,
    deposit,
    withdraw,
    getAllMyOvens,
  } = useKolibriDispatchContext();
  const { allOvens, tezosPrice, tezosPriceDate, balance, myOvens } =
    useKolibriStateContext();
  const { templeAdress, templeBalnce } = useTempleWalletStateContext();
  const { connectTempleWallet } = useTempleWalletDispatchContex();

  return (
    <>
      <button onClick={() => connectWallet(true, 'hangzhounet')} type="button">
        Connect Wallet
      </button>
      <button onClick={getOvens} type="button">
        Show ovens
      </button>
      <button onClick={deployOven} type="button">
        deploy
      </button>
      <button onClick={getOvenBalance} type="button">
        getOvenBalance
      </button>
      <button onClick={deposit} type="button">
        deposit
      </button>
      <button onClick={getAllMyOvens} type="button">
        get my ovens
      </button>
      <button onClick={withdraw} type="button">
        withdraw
      </button>
      <button
        onClick={() => connectTempleWallet(true, 'hangzhounet')}
        type="button"
      >
        Connect Temple Wallet
      </button>
      {balance && `balance: ${balance}`}

      {beaconTezos && (
        <div>
          <div>{`Your address: ${beaconAdress}`}</div>
          <div>{`Your network: ${beaconNet}`}</div>
          <div>{`Your public key: ${beaconPk}`}</div>
          <div>{`Your balance: ${beaconBalance}`}</div>
        </div>
      )}
      {templeAdress && (
        <>
          <div>{templeAdress}</div>
          <div>{templeBalnce}</div>
        </>
      )}
      {allOvens && <div>{allOvens.length}</div>}
      {tezosPrice && (
        <div>{`date: ${tezosPriceDate}, price: ${tezosPrice}`}</div>
      )}

      {myOvens.map((oven) => {
        return <Oven key={oven.ovenAddress} oven={oven} />;
      })}
    </>
  );
};

export default Test;
