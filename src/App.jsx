import { BrowserRouter } from 'react-router-dom';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import AppRouter from './route/AppRouter';

const App = () => {
  return (
    <BeaconProvider>
      <KolibriProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </KolibriProvider>
    </BeaconProvider>
  );
};

export default App;
