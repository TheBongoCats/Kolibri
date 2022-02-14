import discord from '../../images/discord.svg';
import twitter from '../../images/twitter-icon.svg';
import medium from '../../images/medium-icon.3e716df3.svg';
import forum from '../../images/icon-discourse.545380bc.svg';
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
      const { src, href, alt } = social;

      return <SocialLink href={href} alt={alt} src={src} key={src} />;
    })}
  </div>
);

export default Socials;
