import PropTypes from 'prop-types';
import styles from './SocialLink.module.scss';

const SocialLink = ({ href, src, alt, isWide }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img
      src={src}
      alt={alt}
      className={`${styles['social-link__img']} ${
        isWide ? styles['social-link--wide'] : ''
      }`}
    />
  </a>
);

export default SocialLink;

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  isWide: PropTypes.bool,
};

SocialLink.defaultProps = {
  isWide: false,
};
