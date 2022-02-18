import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../contexts/beaconContext';
import Oven from '../../components/Oven';
import kolibri from '../../images/kolibri.svg';
import styled from './Home.module.scss';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { mutateBigNumber } from '../../utils';

const Home = () => {
  const { myOvens, tezosPrice, allOvens, stabilityFeeYear, collateralRatio } =
    useKolibriStateContext();
  const { isLogin } = useBeaconStateContext();

  const price = mutateBigNumber(tezosPrice?.price);

  return (
    <div className={styled.home}>
      <div className={styled.home__upper}>
        <img src={kolibri} alt={kolibri} className={styled.home__kolibri} />
        <div className={styled.home__info}>
          <span
            className={`${styled['home__title--s--l']} ${styled.home__title}`}
          >
            Kolibri
          </span>
          <span
            className={`${styled['home__title--s--s']}  ${styled.home__title}`}
          >
            Stablecoin
          </span>
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
      <div className={styled.home__central}>
        <div className={styled.home__metrics}>
          <div className={styled.metric}>
            <p className={styled.metric__title}>ACTIVE OVENS</p>
            {allOvens ? (
              <p className={styled.metric__value}>{allOvens.length}</p>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styled.metric}>
            <p className={styled.metric__title}>Stability fee (Yearly)</p>
            {stabilityFeeYear ? (
              <p className={styled.metric__value}>{stabilityFeeYear}%</p>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styled.metric}>
            <p className={styled.metric__title}>Collateral value</p>
            {collateralRatio ? (
              <p
                className={`${styled.metric__value} ${styled['metric__value--b']}`}
              >
                {collateralRatio}%
              </p>
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={styled.home__peg}>
          <p>
            KUSD PRICE / PEG DEPTH - <b>$6.46</b> / <b>0,04 KUSD</b> (?)
          </p>
          <div className={styled['progress-bar']}>
            <div className={styled['progress-bar__less']}>
              <div
                className={styled['progress-bar__negative']}
                style={{ width: '0%' }}
              />
            </div>
            <div className={styled['progress-bar__more']}>
              <div
                className={styled['progress-bar__positive']}
                style={{ width: '90%' }}
              />
            </div>
          </div>
          <span className={styled.home__percents}>565,0%</span>
        </div>

        <div>
          <div className={styled.home__br}>
            <button type="button" className={styled.home__more}>
              MORE
            </button>
          </div>
        </div>
        <div className={styled.oracle}>
          <p className={styled.title}>
            Lates <b>XTZ/USD Oracle</b> Price:{' '}
            {tezosPrice ? (
              <span className={styled.oracle__price}>${price}</span>
            ) : (
              <Loader />
            )}
          </p>
          <p className={styled.oracle__updated}>
            Oracle last updated:{' '}
            <span className={styled.oracle__time}>an hour ago</span>
          </p>
        </div>
      </div>
      {!isLogin && (
        <>
          <p>Connect Your Wallet To Manage Your Ovens</p>
          <Button callback={() => null} text="Connect Wallet" isBig />
        </>
      )}
      <div className={styled.home__ovens}>
        {isLogin &&
          (myOvens.length > 0 ? (
            myOvens.map((ovenData) => {
              return <Oven key={ovenData.ovenAddress} ovenData={ovenData} />;
            })
          ) : (
            <Loader text="Loading.." />
          ))}
      </div>
    </div>
  );
};

export default Home;
