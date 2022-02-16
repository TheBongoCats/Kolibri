import discord from '../../images/discord.webp';
import twitter from '../../images/twitter.webp';
import medium from '../../images/medium.webp';
import forum from '../../images/forum.webp';
import SocialLink from '../SocialLink';
import styles from './Socials.module.scss';

const SOCIALS_CONFIG = [
  {
    src: discord,
    href: 'https://discord.gg/pCKVNTw6Pf',
    alt: 'Our Discodr',
  },
  {
    src: twitter,
    href: 'https://twitter.com/hovereng',
    alt: 'Our Twitter',
  },
  {
    src: medium,
    href: 'https://kolibri-xtz.medium.com/',
    alt: 'Our Medium',
    isWide: true,
  },
  {
    src: forum,
    href: 'https://discuss.kolibri.finance/',
    alt: 'Our Forum',
  },
];

const Socials = () => (
  <div className={styles.socials}>
    {SOCIALS_CONFIG.map((social) => {
      const { src, href, alt, isWide } = social;

      return (
        <SocialLink href={href} alt={alt} src={src} key={src} isWide={isWide} />
      );
    })}
  </div>
);

export default Socials;
