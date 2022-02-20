import Logo from '../Logo';
import styles from './Footer.module.scss';
import Socials from '../Socials';
import Policy from '../Policy';

const Footer = () => (
  <footer className={styles.footer}>
    <Logo isSubLogo />
    <div className={styles.footer__contacts}>
      <Policy />
      <Socials />
    </div>
  </footer>
);

export default Footer;
