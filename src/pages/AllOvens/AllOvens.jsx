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
  const ovensForRender = withBalance ? [...ovensWithBalance] : [...allOvens];
  useEffect(async () => {
    await getOvensWithBalance();
  }, []);

  return (
    <div>
      <Button
        type="button"
        callback={() => setWithBalance(!withBalance)}
        text={withBalance ? `Show empty ovens` : `Hide empty ovens`}
      />

      <input type="text" />
      <div>
        {tezosPrice ? (
          ovensForRender.map((oven) => {
            return <Oven ovenData={oven} key={oven.ovenAddress} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AllOvens;
