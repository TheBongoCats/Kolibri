import Test from './components';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';

const App = () => {
  return (
    <BeaconProvider>
      <KolibriProvider>
        <Test />
      </KolibriProvider>
    </BeaconProvider>
  );
};

export default App;
