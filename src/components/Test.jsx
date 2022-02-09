import { Link } from 'react-router-dom';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../contexts/beaconContext';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../contexts/kolibriContext';

import Oven from './Oven';

const Test = () => {
  const { connectWallet } = useBeaconDispatchContext();
  const { beaconAddress, beaconNet, beaconBalance, beaconTezos, beaconPk } =
    useBeaconStateContext();
  const { getOvens, deployOven, getAllMyOvens } = useKolibriDispatchContext();
  const {
    allOvens,
    tezosPrice,
    tezosPriceDate,
    balance,
    myOvensClients,
    ovensWithBalance,
  } = useKolibriStateContext();

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
      <button onClick={getAllMyOvens} type="button">
        get my ovens
      </button>
      <Link to="/all-ovens" type="button">
        getOvensWithBalance
      </Link>

      {balance && `balance: ${balance}`}

      {beaconTezos && (
        <div>
          <div>{`Your address: ${beaconAddress}`}</div>
          <div>{`Your network: ${beaconNet}`}</div>
          <div>{`Your public key: ${beaconPk}`}</div>
          <div>{`Your balance: ${beaconBalance}`}</div>
        </div>
      )}

      {allOvens && (
        <div>
          {allOvens.map((oven) => (
            <button
              type="button"
              key={oven.address}
              onClick={() => oven.deposit()}
            >
              deposit
            </button>
          ))}
        </div>
      )}
      {ovensWithBalance &&
        ovensWithBalance.map((oven) => (
          <div key={oven.ovenAddress}>
            <div>{`Address: ${oven.ovenAddress}`}</div>
            <div>{`Balance: ${oven.balance}`}</div>
            <div>{`Owner: ${oven.ovenOwner}`}</div>
          </div>
        ))}
      {tezosPrice && (
        <div>{`date: ${tezosPriceDate}, price: ${tezosPrice}`}</div>
      )}

      {myOvensClients.map((ovenClient) => {
        return <Oven key={ovenClient.ovenAddress} ovenClient={ovenClient} />;
      })}
    </>
  );
};

export default Test;
