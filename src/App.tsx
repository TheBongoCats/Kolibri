import Test from './components';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import { TempleWalletProvider } from './components/templeWalletContext';

const App = () => {
  return (
    <BeaconProvider>
      <KolibriProvider>
        <TempleWalletProvider>
          <Test />
        </TempleWalletProvider>
      </KolibriProvider>
    </BeaconProvider>
  );
};

export default App;
