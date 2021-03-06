import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import Aside from '../Aside';
import Burger from '../Burger';
import { useI18nStateContext } from '../../contexts/i18nContext';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';
import { walletConnect, walletDisconnect } from './texts.json';
import useWindowWidth from '../../hooks/useWindowWidth';

const Header = () => {
  const { connectWallet, disconnectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();
  const { lang } = useI18nStateContext();

  const [isOpen, setIsOpen] = useState(false);

  const width = useWindowWidth();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleIsOpen = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__sideWrapper}>
        <Logo />
      </div>
      {width > 700 ? (
        <Navigation />
      ) : (
        <Burger isOpen={isOpen} callback={handleIsOpen} />
      )}
      <div
        className={`${styles.header__sideWrapper} ${styles.header__sideWrapperRight}`}
      >
        {isLogin ? (
          <Button callback={disconnectWallet} text={walletDisconnect[lang]} />
        ) : (
          <Button callback={connectWallet} text={walletConnect[lang]} />
        )}
      </div>
      {width <= 700 && <Aside isOpen={isOpen} handleIsOpen={handleIsOpen} />}
    </header>
  );
};

export default Header;
