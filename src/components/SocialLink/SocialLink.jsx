import PropTypes from 'prop-types';
import styles from './SocialLink.module.scss';

const SocialLink = ({ href, src, alt }) => (
  <a href={href}>
    <img src={src} alt={alt} className={styles['social-link__img']} />
  </a>
);

export default SocialLink;

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
};
