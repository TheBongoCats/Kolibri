import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import { useBeaconDispatchContext } from '../../contexts/beaconContext';

const Header = () => {
  const { connectWallet } = useBeaconDispatchContext();

  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <Button
        callback={() => connectWallet(true, 'hangzhounet')}
        text="Connect Wallet"
      />
    </header>
  );
};

export default Header;
