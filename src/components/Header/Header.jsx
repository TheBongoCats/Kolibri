import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';

const Header = () => {
  const { connectWallet, disconnectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();

  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      {isLogin ? (
        <Button callback={disconnectWallet} text="Disconnect Wallet" />
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
