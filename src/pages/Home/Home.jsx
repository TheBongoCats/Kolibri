import { useKolibriStateContext } from '../../contexts/kolibriContext';
import Oven from '../../components/Oven';

const Home = () => {
  const { myOvens } = useKolibriStateContext();
  return (
    <div>
      {myOvens.map((ovenData) => {
        return <Oven key={ovenData.ovenAddress} ovenData={ovenData} />;
      })}
    </div>
  );
};

export default Home;
