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
import Burger from '../Burger';

// const notifyMe = () => {
//   // eslint-disable-next-line no-unused-vars
//   const notification = new Notification('Notification', {
//     tag: 'ache-mail',
//     body: 'Body of notification',
//     icon: Logo,
//   });
//
//   if (notification) {
//     console.log(123);
//   }
// };
//
// const notifSet = () => {
//   if (!('Notification' in window)) {
//     alert('asd');
//   } else if (Notification.permission === 'granted') {
//     setTimeout(notifyMe, 10000);
//   } else if (Notification.permission !== 'denied') {
//     Notification.requestPermission((permission) => {
//       if (!('permission' in Notification)) {
//         Notification.permission = permission;
//       }
//       if (permission === 'granted') {
//         setTimeout(notifyMe, 10000);
//       }
//     });
//   }
// };

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <header className={styles.header}>
      <Logo />
      {width >= 595 ? (
        <Navigation />
      ) : (
        <Burger isOpen={isOpen} callback={handleIsOpen} />
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
