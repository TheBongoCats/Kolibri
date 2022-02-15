import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import { useBeaconDispatchContext } from '../../contexts/beaconContext';
import WalletData from '../WalletData';

const Header = () => {
  const { connectWallet, isLoggin } = useBeaconDispatchContext();

  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      {isLoggin ? (
        <WalletData />
      ) : (
        <Button
          callback={() => connectWallet(true, 'hangzhounet')}
          text="Connect Wallet"
        />
      )}
    </header>
  );
};

export default Header;
