import Logo from '../Logo';
import Navigation from '../Navigation';
import styles from './Header.module.scss';
import Button from '../Button';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';
import I18n from '../I18n';
import { buttonConnect, buttonDisconnect } from './texts';
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
        <Button callback={disconnectWallet} text={buttonConnect[`${lang}`]} />
      ) : (
        <Button
          callback={() => connectWallet(true, 'hangzhounet')}
          text={buttonDisconnect[`${lang}`]}
        />
      )}
      <I18n />
    </header>
  );
};

export default Header;
