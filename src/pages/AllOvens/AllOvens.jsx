import { useEffect, useState } from 'react';

import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import { useI18nStateContext } from '../../contexts/i18nContext';
import { useBeaconStateContext } from '../../contexts/beaconContext';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import OvenList from '../../components/OvenList';
import UserData from '../../components/UserData';

import styles from './AllOvens.module.scss';
import { mutateBigNumber } from '../../utils';
import {
  showEmptyButton,
  hideEmptyButton,
  outstandingTokensSort,
  valueSort,
  searchPlaceholder,
} from './texts.json';

const AllOvens = () => {
  const { allOvens, tezosPrice } = useKolibriStateContext();
  const { isLogin } = useBeaconStateContext();
  const { getKusdBalance } = useKolibriDispatchContext();
  const { lang } = useI18nStateContext();
  const [withBalance, setWithBalance] = useState(true);
  const [searchedOvens, setSearchedOvens] = useState([]);
  const [searchWasDone, setSearchWasDone] = useState(false);
  const [ovensWithBalance, setOvensWithBalance] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [paginationSelected, setPaginationSelected] = useState(1);
  const ovensForSearch = withBalance ? ovensWithBalance : allOvens;
  const ovensForRender = searchWasDone ? searchedOvens : ovensForSearch;
  const paginationPages = Math.ceil(ovensForRender.length / 10);

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

  useEffect(() => {
    setOvensWithBalance(allOvens.filter((oven) => oven.balance > 0));
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

  const paginationHandler = (direction) => {
    if (direction === 'right') {
      if (!(paginationSelected === paginationPages)) {
        setPaginationSelected(paginationSelected + 1);
      }
    }

    if (direction === 'end') {
      if (!(paginationSelected === paginationPages)) {
        setPaginationSelected(paginationPages);
      }
    }

    if (direction === 'left') {
      if (!(paginationSelected === 1)) {
        setPaginationSelected(paginationSelected - 1);
      }
    }

    if (direction === 'start') {
      if (!(paginationSelected === 1)) {
        setPaginationSelected(1);
      }
    }
  };

  return (
    <div className={styles['all-ovens']}>
      {isLogin && <UserData />}
      <div className={styles['all-ovens__container']}>
        <Button
          type="button"
          callback={() => setWithBalance(!withBalance)}
          text={withBalance ? showEmptyButton[lang] : hideEmptyButton[lang]}
        />
        <Button
          type="button"
          callback={() => setIsSorted(!isSorted)}
          text={isSorted ? outstandingTokensSort[lang] : valueSort[lang]}
        />

        <input
          id="search"
          type="text"
          onChange={changeHandler}
          placeholder={searchPlaceholder[lang]}
          className={styles['all-ovens__input']}
          onClick={getKusdBalance}
        />
      </div>
      {allOvens.length > 0 ? (
        ovensForRender.length > 0 && (
          <>
            <OvenList
              ovens={
                searchWasDone
                  ? ovensForRender.sort(compare)
                  : ovensForRender
                      .sort(compare)
                      .slice(
                        (paginationSelected - 1) * 10,
                        (paginationSelected - 1) * 10 + 10,
                      )
              }
            />
            {!searchWasDone ? (
              <div className={styles['all-ovens__pagination']}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className={`${styles['all-ovens__item']} ${styles['all-ovens__item--pointer']}`}
                  onClick={() => paginationHandler('start')}
                >
                  {'<<'}
                </div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className={`${styles['all-ovens__item']} ${styles['all-ovens__item--pointer']}`}
                  onClick={() => paginationHandler('left')}
                >
                  {'<'}
                </div>
                <div
                  className={styles['all-ovens__item']}
                >{`${paginationSelected} of ${paginationPages}`}</div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className={`${styles['all-ovens__item']} ${styles['all-ovens__item--pointer']}`}
                  onClick={() => paginationHandler('right')}
                >
                  {'>'}
                </div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div
                  className={`${styles['all-ovens__item']} ${styles['all-ovens__item--pointer']}`}
                  onClick={() => paginationHandler('end')}
                >
                  {'>>'}
                </div>
              </div>
            ) : null}
          </>
        )
      ) : (
        <Loader text="Loading..." />
      )}
    </div>
  );
};

export default AllOvens;
