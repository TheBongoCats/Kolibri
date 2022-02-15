import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../contexts/beaconContext';
import Oven from '../../components/Oven';

const Home = () => {
  const { myOvens } = useKolibriStateContext();
  const { isLoggin } = useBeaconStateContext();

  return (
    <div>
      {isLoggin &&
        (myOvens.length > 0 ? (
          myOvens.map((ovenData) => {
            return <Oven key={ovenData.ovenAddress} ovenData={ovenData} />;
          })
        ) : (
          <p>Loading</p>
        ))}
    </div>
  );
};

export default Home;
