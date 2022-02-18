import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import Oven from '../../components/Oven';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import styles from './AllOvens.module.scss';

const AllOvens = () => {
  const { allOvens, tezosPrice } = useKolibriStateContext();
  const [withBalance, setWithBalance] = useState(true);
  const [searchedOvens, setSearchedOvens] = useState([]);
  const [searchWasDone, setSearchWasDone] = useState(false);
  const [ovensWithBalance, setOvensWithBalance] = useState();
  const ovensForSearch = withBalance ? ovensWithBalance : allOvens;
  const ovensForRender = searchWasDone ? searchedOvens : ovensForSearch;

  useEffect(async () => {
    if (allOvens) {
      setOvensWithBalance(allOvens.filter((oven) => oven.balance > 0));
    }
    console.log(allOvens);
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

      <input type="text" onChange={(e) => changeHandler(e)} />
      <div className={styles['all-ovens__wrapper']}>
        {ovensForRender && tezosPrice ? (
          ovensForRender.map((oven) => (
            <Oven ovenData={oven} key={oven.ovenAddress} />
          ))
        ) : (
          <Loader text="Loading..." />
        )}
      </div>
    </div>
  );
};

export default AllOvens;
