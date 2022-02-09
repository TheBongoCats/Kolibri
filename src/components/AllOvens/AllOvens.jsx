import { useEffect, useState } from 'react';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import CONSTANTS from '../../utils/constants';

const AllOvens = () => {
  const { allOvens, ovensWithBalance } = useKolibriStateContext();
  const { getOvensWithBalance } = useKolibriDispatchContext();
  const [withBalance, setWithBalance] = useState(true);
  const ovensForRender = withBalance ? ovensWithBalance : allOvens;

  useEffect(() => {
    getOvensWithBalance();
  }, []);

  return (
    <div>
      <button type="button" onClick={() => setWithBalance(!withBalance)}>
        {withBalance ? `Show empty ovens` : `Hide empty ovens`}
      </button>
      {ovensWithBalance &&
        ovensForRender.map((oven) => {
          const { ovenAddress, balance, ovenOwner } = oven;
          return (
            <div key={ovenAddress}>
              <div>{`Address: ${ovenAddress}`}</div>
              <div>{`Balance: ${+balance / CONSTANTS.MUTEZ_IN_TEZOS}`}</div>
              <div>{`Owner: ${ovenOwner}`}</div>
            </div>
          );
        })}
    </div>
  );
};

export default AllOvens;
