import { HashRouter } from 'react-router-dom';
import { I18nProvider } from './contexts/i18nContext';
import { ThemeProvider } from './contexts/themeContext';
import { BeaconProvider } from './contexts/beaconContext';
import { KolibriProvider } from './contexts/kolibriContext';
import { OvenModalProvider } from './contexts/modalContext';
import AppRouter from './route/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/index.scss';

const App = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BeaconProvider>
          <KolibriProvider>
            <OvenModalProvider>
              <HashRouter>
                <Header />
                <AppRouter />
                <Footer />
              </HashRouter>
            </OvenModalProvider>
          </KolibriProvider>
        </BeaconProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
