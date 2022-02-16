import Logo from '../Logo';
import styles from './Footer.module.scss';
import Contacts from '../Contacts';

const Footer = () => (
  <footer className={styles.footer}>
    <Logo isSubLogo />
    <Contacts />
  </footer>
);

export default Footer;
