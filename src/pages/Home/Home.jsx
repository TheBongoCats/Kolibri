import { useKolibriStateContext } from '../../contexts/kolibriContext';
import {
  useBeaconDispatchContext,
  useBeaconStateContext,
} from '../../contexts/beaconContext';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Metric from '../../components/Oven/Metric';

import styled from './Home.module.scss';
import kolibri from '../../images/kolibri.svg';
import Peg from '../../components/Home/Peg';
import Oracle from '../../components/Home/Oracle/Oracle';
import OvenList from '../../components/OvenList/OvenList';

const Home = () => {
  const { myOvens, allOvens, stabilityFeeYear, collateralRatio } =
    useKolibriStateContext();
  const { connectWallet } = useBeaconDispatchContext();
  const { isLogin } = useBeaconStateContext();

  return (
    <div className={styled.home}>
      <div className={styled.home__head}>
        <img src={kolibri} alt={kolibri} className={styled.home__kolibri} />
        <div className={styled.home__info}>
          <span className={styled.home__title}>Kolibri</span>
          <span className={styled.home__subtitle}>Stablecoin</span>
          <div className={styled.home__buttons}>
            <Button
              callback={() => null}
              text="Learn more"
              isTransparent
              isRounded
            />
            <Button
              callback={() => null}
              text="Metrics"
              isTransparent
              isRounded
            />
          </div>
        </div>
      </div>
      <div className={styled.home__container}>
        <div className={styled.home__metrics}>
          <Metric title="Active ovens" value={allOvens?.length} size="l" />
          <Metric
            title="Stability fee (Yearly)"
            value={stabilityFeeYear}
            unit="%"
            size="l"
          />
          <Metric
            title="Collateral value"
            value={collateralRatio}
            unit="%"
            size="l"
          />
        </div>
        <Peg percents="-95" />
        <div className={styled.home__line}>
          <button type="button" className={styled.home__more}>
            MORE
          </button>
        </div>
        <Oracle />
      </div>
      {!isLogin && (
        <>
          <p className={styled.home__connect}>
            Connect Your Wallet To Manage Your Ovens
          </p>
          <Button
            callback={() => connectWallet(true, 'hangzhounet')}
            text="Connect Wallet"
            isBig
          />
        </>
      )}
      <div>
        {isLogin &&
          (myOvens.length > 0 ? (
            <OvenList ovens={myOvens} />
          ) : (
            <Loader text="Looking for your ovens" />
          ))}
      </div>
    </div>
  );
};

export default Home;
