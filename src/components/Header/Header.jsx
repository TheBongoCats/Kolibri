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

const Header = () => {
  const { connectWallet, disconnectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();
  const { lang } = useI18nStateContext();

  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
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
    </header>
  );
};

export default Header;
