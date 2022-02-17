/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import CONSTANTS from '../../utils/constants';
import OvenNav from '../OvenNav';
import styled from './Oven.module.scss';

const mutateNumber = (
  number,
  denominator = CONSTANTS.MUTEZ_IN_TEZOS,
  toFixed = 2,
) => (number / denominator).toFixed(toFixed);

const Oven = ({ ovenData }) => {
  const { tezosPrice } = useKolibriStateContext();

  const balance = mutateNumber(ovenData.balance);
  const collateralValue = mutateNumber(balance * tezosPrice.price);
  const loan = mutateNumber(ovenData.outstandingTokens, 1e18);
  const stabilityFees = (ovenData.stabilityFees / 1e18).toFixed(12);

  // const borrowedTokens = mutateNumber(ovenData.borrowedTokens, 1e18);

  return (
    <div className={styled.oven}>
      <p className={`${styled.oven__title} ${styled['oven__title--s--l']}`}>
        {ovenData.ovenAddress}
      </p>
      <div className={styled.oven__flexbox}>
        <div className={styled.oven__info}>
          <div>
            <p
              className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
            >
              DELEGATED BAKER:
            </p>
            <p
              className={`${styled.oven__value} ${styled['oven__value--s--s']}`}
            >
              {ovenData.baker}
            </p>
          </div>
          {ovenData.ovenClient ? (
            <p
              className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
            >
              Liquidatable when XTZ = <span>$1.32</span>
            </p>
          ) : (
            <div>
              <p
                className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
              >
                OWNER:
              </p>
              <p
                className={`${styled.oven__value} ${styled['oven__value--s--s']}`}
              >
                {ovenData.ovenOwner}
              </p>
            </div>
          )}
        </div>
        <div className={styled.oven__progress}>
          <CircularProgressbar value={60} text="50%" />
        </div>
      </div>
      <div className={styled.oven__metrics}>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            COLLATERAL VALUE:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {collateralValue}
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            BALANCE:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {balance}
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            LOAN:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {loan}
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            STABILITY FEES:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {stabilityFees}
          </p>
        </div>
      </div>
      <div className={styled.oven__nav}>
        {ovenData.ovenClient && <OvenNav ovenClient={ovenData.ovenClient} />}
      </div>
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  ovenData: propTypes.shape({
    baker: propTypes.string,
    balance: propTypes.object,
    borrowedTokens: propTypes.object,
    isLiquidated: propTypes.bool,
    outstandingTokens: propTypes.object,
    ovenAddress: propTypes.string,
    ovenOwner: propTypes.string,
    stabilityFees: propTypes.object,
    ovenClient: () => null,
  }),
};

Oven.defaultProps = {
  ovenData: {},
};
