import Socials from '../Socials';
import Policy from '../Policy';
import styles from './Contacts.module.scss';

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <Policy />
      <Socials />
    </div>
  );
};

export default Contacts;
