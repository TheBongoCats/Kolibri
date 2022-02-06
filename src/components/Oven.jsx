import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { MUTEZ_IN_TEZOS } from '../utils/constants';

const Oven = ({ oven }) => {
  const [myOven, setMyOven] = useState({});

  const { ovenAddress } = oven;

  const handleWithdraw = (amount) => {
    oven.withdraw(amount);
  };

  const handleDeposit = (amount) => {
    oven.deposit(amount);
  };

  useEffect(async () => {
    setMyOven({
      baker: await oven.getBaker(),
      balance: await oven.getBalance(),
    });
  }, []);

  return (
    <div>
      {`ADDRESS: ${ovenAddress} `}
      {`BAKER: ${myOven.baker} `}
      {`BALANCE: ${myOven.balance / MUTEZ_IN_TEZOS} `}
      <button
        onClick={() => handleWithdraw(new BigNumber(5 * MUTEZ_IN_TEZOS))}
        type="button"
      >
        withdraw
      </button>
      <button
        onClick={() => handleDeposit(new BigNumber(5 * MUTEZ_IN_TEZOS))}
        type="button"
      >
        deposit
      </button>
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  oven: propTypes.object.isRequired,
};
