import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';
import { walletConnect, walletDisconnect } from './texts.json';
import { useI18nStateContext } from '../../contexts/i18nContext';
import Aside from '../Aside';

const Header = () => {
  const { connectWallet, disconnectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();
  const { lang } = useI18nStateContext();

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  const handleIsOpen = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  // for testing
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  // for testing end

  return (
    <header className={styles.header}>
      <Logo />
      {width >= 595 ? (
        <Navigation />
      ) : (
        <button
          type="button"
          className={
            isOpen
              ? `${styles.header__burger} ${styles['header__burger--clicked']}`
              : styles.header__burger
          }
          onClick={handleIsOpen}
          aria-label="Open"
        />
      )}
      {isLogin ? (
        <Button
          callback={disconnectWallet}
          text={walletDisconnect[`${lang}`]}
        />
      ) : (
        <Button
          callback={() => connectWallet(true, 'hangzhounet')}
          text={walletConnect[`${lang}`]}
        />
      )}
      {width <= 589 && <Aside isOpen={isOpen} handleIsOpen={handleIsOpen} />}
    </header>
  );
};

export default Header;
