import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import CONSTANTS from '../utils/constants';

const Oven = ({ ovenClient }) => {
  const [myOven, setMyOven] = useState({});

  const handleWithdraw = (amount) => {
    ovenClient.withdraw(amount);
  };

  // const handleDeposit = (amount) => {
  //   ovenClient.deposit(amount);
  // };

  const handleLiquidate = () => {
    ovenClient.liquidate();
  };

  useEffect(() => {
    (async () =>
      setMyOven({
        baker: await ovenClient.getBaker(),
        balance: await ovenClient.getBalance(),
        borrowedTokens: await ovenClient.getBorrowedTokens(),
        isLiquidated: await ovenClient.isLiquidated(),
        outstandingTokens: await ovenClient.getTotalOutstandingTokens(),
        ovenAddress: await ovenClient.ovenAddress,
        ovenOwner: await ovenClient.getOwner(),
        stabilityFees: await ovenClient.getStabilityFees(),
      }))();
  }, []);

  return (
    <div>
      {`ADDRESS: ${myOven.ovenAddress} `}
      {`BAKER: ${myOven.baker} `}
      {`BALANCE: ${myOven.balance / CONSTANTS.MUTEZ_IN_TEZOS} `}
      <button
        onClick={() =>
          handleWithdraw(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        type="button"
      >
        withdraw
      </button>
      <button onClick={handleLiquidate} type="button">
        handleLiquidate
      </button>
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ovenClient: propTypes.object.isRequired,
};
