import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './contexts/i18nContext';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import { OvenModalProvider } from './contexts/modalContext';
import AppRouter from './route/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/index.scss';

const App = () => {
  return (
    <I18nProvider>
      <BeaconProvider>
        <KolibriProvider>
          <OvenModalProvider>
            <BrowserRouter>
              <Header />
              <AppRouter />
              <Footer />
            </BrowserRouter>
          </OvenModalProvider>
        </KolibriProvider>
      </BeaconProvider>
    </I18nProvider>
  );
};

export default App;
