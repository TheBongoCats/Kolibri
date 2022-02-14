import Logo from '../Logo';
import Socials from '../Socials';
import styles from './Footer.module.scss';
import Policy from '../Policy';

const Footer = () => (
  <footer className={styles.footer}>
    <Logo />
    <Policy />
    <Socials />
  </footer>
);

export default Footer;
