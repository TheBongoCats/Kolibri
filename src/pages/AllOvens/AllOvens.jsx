import { useEffect, useState } from 'react';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import Oven from '../../components/Oven';

const AllOvens = () => {
  const { allOvens, ovensWithBalance } = useKolibriStateContext();
  const { getOvensWithBalance } = useKolibriDispatchContext();
  const [withBalance, setWithBalance] = useState(true);
  const ovensForRender = withBalance ? ovensWithBalance : allOvens;
  let ovensArr;
  useEffect(() => {
    getOvensWithBalance();
  }, []);

  useEffect(() => {
    if (allOvens) {
      ovensArr = [...allOvens];
    }
  }, [allOvens]);

  console.log(ovensArr);

  return (
    <div>
      <button type="button" onClick={() => setWithBalance(!withBalance)}>
        {withBalance ? `Show empty ovens` : `Hide empty ovens`}
      </button>
      <input type="text" />
      {ovensWithBalance &&
        ovensForRender.map((oven) => {
          return <Oven ovenData={oven} key={oven.ovenAddress} />;
        })}
    </div>
  );
};

export default AllOvens;
