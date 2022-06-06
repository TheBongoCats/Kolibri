/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import { useI18nStateContext } from '../../contexts/i18nContext';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';

import Button from '../../components/Button';
import Metric from '../../components/Oven/Metric';
import Peg from '../../components/Home/Peg';
import Oracle from '../../components/Home/Oracle/Oracle';
import OvenList from '../../components/OvenList';
import UserData from '../../components/UserData';
import Logo from '../../components/Logo';

import styles from './Home.module.scss';
import {
  metricsButton,
  learnMoreButton,
  activeOvensCount,
  stabilityFeeCount,
  collateralValueCount,
  connectWalletParagraph,
  connectButton,
  deployButton,
} from './texts.json';
import useWindowWidth from '../../hooks/useWindowWidth';

const Home = () => {
  const { myOvens, allOvens, stabilityFeeYear, collateralRatio } =
    useKolibriStateContext();
  const { deployOven } = useKolibriDispatchContext();
  const { connectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();
  const { lang } = useI18nStateContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const width = useWindowWidth();

  const handleDeployOven = async () => {
    try {
      setIsDisabled(true);
      await deployOven();
      setIsDisabled(false);
    } catch (e) {
      setIsDisabled(false);
    }
  };

  return (
    <div className={styles.home}>
      {isLogin && width >= 700 && <UserData />}
      <div className={styles.home__head}>
        {width >= 700 && <Logo isBig />}
        <div className={styles.home__info}>
          <span className={styles.home__title}>Kolibri</span>
          <span className={styles.home__subtitle}>Stablecoin</span>
          <div className={styles.home__buttons}>
            <Link to="/docs" target="_blank">
              <Button
                callback={() => null}
                text={learnMoreButton[lang]}
                isRounded
              />
            </Link>
            <a
              href="https://metrics.kolibri.finance/"
              rel="noreferrer"
              target="_blank"
            >
              <Button
                callback={() => null}
                text={metricsButton[lang]}
                isRounded
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.home__container}>
        <div className={styles.home__metrics}>
          <Metric
            title={activeOvensCount[lang]}
            value={allOvens?.length}
            size="l"
          />
          <Metric
            title={stabilityFeeCount[lang]}
            value={stabilityFeeYear}
            unit="%"
            size="l"
          />
          <Metric
            title={collateralValueCount[lang]}
            value={collateralRatio}
            unit="%"
            size="l"
          />
        </div>
        <Peg />
        <Oracle />
      </div>

      {isLogin ? (
        <>
          <Button
            callback={handleDeployOven}
            text={deployButton[lang]}
            isBig
            isDisabled={isDisabled}
          />
          {myOvens.length > 0 && <OvenList ovens={myOvens} />}
        </>
      ) : (
        <>
          <p className={styles.home__connect}>{connectWalletParagraph[lang]}</p>
          <Button callback={connectWallet} text={connectButton[lang]} isBig />
        </>
      )}
    </div>
  );
};

export default Home;
