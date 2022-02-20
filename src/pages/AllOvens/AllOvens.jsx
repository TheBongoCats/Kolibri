import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import styles from './AllOvens.module.scss';
import { mutateBigNumber } from '../../utils';
import {
  showEmptyButton,
  hideEmptyButton,
  outstandingTokensSort,
  valueSort,
} from './texts.json';
import { useI18nStateContext } from '../../contexts/i18nContext';
import OvenList from '../../components/OvenList/OvenList';

const AllOvens = () => {
  const { allOvens, tezosPrice } = useKolibriStateContext();
  const { lang } = useI18nStateContext();
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
      paramA = balanceA;
      paramB = balanceB;
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
    <div className={styles['all-ovens']}>
      <Button
        type="button"
        callback={() => setWithBalance(!withBalance)}
        text={
          withBalance ? showEmptyButton[`${lang}`] : hideEmptyButton[`${lang}`]
        }
      />
      <Button
        type="button"
        callback={() => setIsSorted(!isSorted)}
        text={
          isSorted ? outstandingTokensSort[`${lang}`] : valueSort[`${lang}`]
        }
      />

      <input type="text" onChange={(e) => changeHandler(e)} />
      <div>
        {ovensForRender && tezosPrice ? (
          <OvenList ovens={ovensForRender.sort(compare)} />
        ) : (
          <Loader text="Loading..." />
        )}
      </div>
    </div>
  );
};

export default AllOvens;
