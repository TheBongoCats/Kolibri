import Logo from '../Logo';
import styles from './Footer.module.scss';
import Socials from '../Socials';
import Policy from '../Policy';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__info}>
      <Logo isSubLogo />
      <Policy />
    </div>
    <Socials />
  </footer>
);

export default Footer;
