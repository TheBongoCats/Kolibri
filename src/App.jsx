import { BrowserRouter } from 'react-router-dom';

import AppContextProvider from './contexts/AppContextProvider';
import AppRouter from './route/AppRouter';

import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';

import './styles/index.scss';

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
        <Modal />
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
