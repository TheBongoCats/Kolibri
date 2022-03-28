import { HashRouter } from 'react-router-dom';

import AppContextProvider from './contexts/AppContextProvider';
import AppRouter from './route/AppRouter';

import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';

import './styles/index.scss';

const App = () => {
  return (
    <AppContextProvider>
      <HashRouter>
        <Header />
        <AppRouter />
        <Footer />
        <Modal />
      </HashRouter>
    </AppContextProvider>
  );
};

export default App;
