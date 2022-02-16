import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../contexts/beaconContext';
import Oven from '../../components/Oven';
import kolibri from '../../images/kolibri.svg';
import styled from './Home.module.scss';
import Button from '../../components/Button';

const Home = () => {
  const { myOvens } = useKolibriStateContext();
  const { isLogin } = useBeaconStateContext();

  return (
    <div className={styled.home}>
      <div className={styled.home__upper}>
        <img src={kolibri} alt={kolibri} className={styled.home__kolibri} />
        <div className={styled.home__info}>
          <span className={styled['home__title--s--big']}>KOLIBRI</span>
          <span className={styled['home__title--s--small']}>Stablecoin</span>
          <div>
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
            <p className={styled.metric__value}>15</p>
          </div>
          <div className={styled.metric}>
            <p className={styled.metric__title}>Stability fee (Yearly)</p>
            <p className={styled.metric__value}>0.00%</p>
          </div>
          <div className={styled.metric}>
            <p className={styled.metric__title}>Collateral value</p>
            <p
              className={`${styled.metric__value} ${styled['metric__value--b']}`}
            >
              200%
            </p>
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
            <span className={styled.oracle__price}>$4.13</span>
          </p>
          <p className={styled.oracle__updated}>
            Oracle last updated:{' '}
            <span className={styled.oracle__time}>an hour ago</span>
          </p>
        </div>
      </div>
      <p>Connect Your Wallet To Manage Your Ovens</p>
      <Button callback={() => null} text="Connect Wallet" isBig />
      <div>
        {isLogin &&
          (myOvens.length > 0 ? (
            myOvens.map((ovenData) => {
              return <Oven key={ovenData.ovenAddress} ovenData={ovenData} />;
            })
          ) : (
            <p>Loading</p>
          ))}
      </div>
    </div>
  );
};

export default Home;
