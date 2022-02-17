import { useEffect, useState } from 'react';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import Oven from '../../components/Oven';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

const AllOvens = () => {
  const { allOvens, ovensWithBalance, tezosPrice } = useKolibriStateContext();
  const { getOvensWithBalance } = useKolibriDispatchContext();
  const [withBalance, setWithBalance] = useState(true);
  const [searchedOvens, setSearchedOvens] = useState([]);
  const [searchWasDone, setSearchWasDone] = useState(false);
  const ovensForSearch = withBalance ? ovensWithBalance : allOvens;
  const ovensForRender = searchWasDone ? searchedOvens : ovensForSearch;

  useEffect(async () => {
    await getOvensWithBalance();
  }, []);

  const changeHandler = (e) => {
    if (e.target.value.length >= 2) {
      const arr = ovensForSearch.filter(
        (oven) =>
          oven.ovenOwner.includes(e.target.value) ||
          oven.ovenAddress.includes(e.target.value),
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
      <div>
        {tezosPrice ? (
          ovensForRender.map((oven) => (
            <Oven ovenData={oven} key={oven.ovenAddress} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AllOvens;
