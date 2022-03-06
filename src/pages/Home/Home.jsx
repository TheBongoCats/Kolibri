import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { useI18nStateContext } from '../../contexts/i18nContext';
import { useOvenModalStateContext } from '../../contexts/modalContext';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Metric from '../../components/Oven/Metric';
import Modal from '../../components/Oven/Modal';
import Peg from '../../components/Home/Peg';
import Oracle from '../../components/Home/Oracle/Oracle';
import OvenList from '../../components/OvenList/OvenList';
import UserData from '../../components/UserData';

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
} from './texts.json';
import Logo from '../../components/Logo';

const Home = () => {
  const { myOvens, allOvens, stabilityFeeYear, collateralRatio } =
    useKolibriStateContext();
  const { connectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();
  const { lang } = useI18nStateContext();
  const { modalId } = useOvenModalStateContext();

  return (
    <>
      <div className={styled.home}>
        {isLogin && <UserData />}
        <div className={styled.home__head}>
          <Logo isBig />
          <div className={styled.home__info}>
            <span className={styled.home__title}>Kolibri</span>
            <span className={styled.home__subtitle}>Stablecoin</span>
            <div className={styled.home__buttons}>
              <Button
                callback={() => null}
                text={learnMoreButton[`${lang}`]}
                isTransparent
                isRounded
              />
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
        {!isLogin && (
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
        <div>
          {isLogin &&
            (myOvens.length > 0 ? (
              <OvenList ovens={myOvens} />
            ) : (
              <Loader text={loaderText[`${lang}`]} />
            ))}
        </div>
      </div>
      {modalId && <Modal />}
    </>
  );
};

export default Home;
