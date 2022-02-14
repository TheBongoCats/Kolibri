import { BrowserRouter } from 'react-router-dom';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import AppRouter from './route/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <BeaconProvider>
      <KolibriProvider>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </KolibriProvider>
    </BeaconProvider>
  );
};

export default App;
