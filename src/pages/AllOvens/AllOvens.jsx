import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import Oven from '../../components/Oven';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import styles from './AllOvens.module.scss';
import { mutateBigNumber } from '../../utils';

const AllOvens = () => {
  const { allOvens, tezosPrice } = useKolibriStateContext();
  const [ovens, setOvens] = useState([]);
  const [withBalance, setWithBalance] = useState(true);
  const [searchedOvens, setSearchedOvens] = useState([]);
  const [searchWasDone, setSearchWasDone] = useState(false);
  const [ovensWithBalance, setOvensWithBalance] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const ovensForSearch = withBalance ? ovensWithBalance : ovens;
  const ovensForRender = searchWasDone ? searchedOvens : ovensForSearch;

  const compare = (a, b) => {
    const balanceA = mutateBigNumber(a.balance);
    const balanceB = mutateBigNumber(b.balance);

    let paramA;
    let paramB;
    if (isSorted) {
      paramA = mutateBigNumber(balanceA * tezosPrice.price);
      paramB = mutateBigNumber(balanceB * tezosPrice.price);
    } else {
      const collateralValueA = mutateBigNumber(balanceA * tezosPrice.price);
      const collateralValueB = mutateBigNumber(balanceB * tezosPrice.price);

      const loanA = mutateBigNumber(a.outstandingTokens, 1e18);
      const loanB = mutateBigNumber(b.outstandingTokens, 1e18);

      paramA = (loanA / collateralValueA) * 200;
      paramB = (loanB / collateralValueB) * 200;
    }

    if (+paramA > +paramB) {
      return -1;
    }

    if (+paramA < +paramB) {
      return 1;
    }

    return 0;
  };

  useEffect(async () => {
    if (allOvens) {
      setOvens([...allOvens]);
      setOvensWithBalance(allOvens.filter((oven) => oven.balance > 0));
    }
  }, [allOvens]);

  const changeHandler = (e) => {
    if (e.target.value.length >= 2) {
      const arr = ovensForSearch.filter(
        (oven) =>
          oven.ovenOwner.toLowerCase().includes(e.target.value.toLowerCase()) ||
          oven.ovenAddress.toLowerCase().includes(e.target.value.toLowerCase()),
      );

      setSearchedOvens(arr);
    }

    if (e.target.value.length > 2) {
      setSearchWasDone(true);
    } else {
      setSearchWasDone(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        callback={() => setWithBalance(!withBalance)}
        text={withBalance ? `Show empty ovens` : `Hide empty ovens`}
      />
      <Button
        type="button"
        callback={() => setIsSorted(!isSorted)}
        text={isSorted ? `Sort by value` : `Sort by outstanding tokens`}
      />

      <input type="text" onChange={(e) => changeHandler(e)} />
      <div className={styles['all-ovens__wrapper']}>
        {ovensForRender && tezosPrice ? (
          ovensForRender
            .sort(compare)
            .map((oven) => <Oven ovenData={oven} key={oven.ovenAddress} />)
        ) : (
          <Loader text="Loading..." />
        )}
      </div>
    </div>
  );
};

export default AllOvens;
