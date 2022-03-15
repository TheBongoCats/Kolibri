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
import Loader from '../../components/Loader';
import Metric from '../../components/Oven/Metric';
import Peg from '../../components/Home/Peg';
import Oracle from '../../components/Home/Oracle/Oracle';
import OvenList from '../../components/OvenList/OvenList';
import UserData from '../../components/UserData';
import Logo from '../../components/Logo';

import styled from './Home.module.scss';
import {
  metricsButton,
  learnMoreButton,
  activeOvensCount,
  stabilityFeeCount,
  collateralValueCount,
  moreButton,
  connectWalletParagraph,
  connectButton,
  loaderText,
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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const width = useWindowWidth();

  const handleDeployOven = async () => {
    try {
      setButtonDisabled(true);
      await deployOven();
      setButtonDisabled(false);
    } catch (e) {
      setButtonDisabled(false);
      // for testing
      console.error(e);
      // for testing end
    }
  };

  return (
    <div className={styled.home}>
      {isLogin && width >= 700 && <UserData />}
      <div className={styled.home__head}>
        {width >= 700 && <Logo isBig />}
        <div className={styled.home__info}>
          <span className={styled.home__title}>Kolibri</span>
          <span className={styled.home__subtitle}>Stablecoin</span>
          <div className={styled.home__buttons}>
            <Link to="/docs">
              <Button
                callback={() => null}
                text={learnMoreButton[`${lang}`]}
                isTransparent
                isRounded
              />
            </Link>
            <Button
              callback={() => null}
              text={metricsButton[`${lang}`]}
              isTransparent
              isRounded
            />
          </div>
        </div>
      </div>
      <div className={styled.home__container}>
        <div className={styled.home__metrics}>
          <Metric
            title={activeOvensCount[`${lang}`]}
            value={allOvens?.length}
            size="l"
          />
          <Metric
            title={stabilityFeeCount[`${lang}`]}
            value={stabilityFeeYear}
            unit="%"
            size="l"
          />
          <Metric
            title={collateralValueCount[`${lang}`]}
            value={collateralRatio}
            unit="%"
            size="l"
          />
        </div>
        <Peg percents="35" />
        <div className={styled.home__line}>
          <button type="button" className={styled.home__more}>
            {moreButton[`${lang}`]}
          </button>
        </div>
        <Oracle />
      </div>
      {isLogin ? (
        myOvens.length > 0 ? (
          <>
            <Button
              callback={handleDeployOven}
              text={deployButton[`${lang}`]}
              isBig
              isDisabled={buttonDisabled}
            />
            <OvenList ovens={myOvens} />
          </>
        ) : (
          <Loader text={loaderText[`${lang}`]} />
        )
      ) : (
        <>
          <p className={styled.home__connect}>
            {connectWalletParagraph[`${lang}`]}
          </p>
          <Button
            callback={() => connectWallet(true, 'hangzhounet')}
            text={connectButton[`${lang}`]}
            isBig
          />
        </>
      )}
    </div>
  );
};

export default Home;
