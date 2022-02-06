import Test from './components';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import { TempleWalletProvider } from './contexts/templeWalletContext';

const App = () => {
  return (
    <BeaconProvider>
      <TempleWalletProvider>
        <KolibriProvider>
          <Test />
        </KolibriProvider>
      </TempleWalletProvider>
    </BeaconProvider>
  );
};

export default App;
