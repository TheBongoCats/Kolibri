import propTypes from 'prop-types';

export const OvenDataType = propTypes.shape({
  baker: propTypes.string,
  balance: propTypes.oneOfType([propTypes.object, propTypes.string]),
  borrowedTokens: propTypes.oneOfType([propTypes.object, propTypes.string]),
  isLiquidated: propTypes.bool,
  outstandingTokens: propTypes.oneOfType([propTypes.object, propTypes.string]),
  ovenAddress: propTypes.string,
  ovenOwner: propTypes.string,
  stabilityFees: propTypes.oneOfType([propTypes.object, propTypes.string]),
  ovenClient: () => null,
});

export const ovenMetricsType = propTypes.shape({
  balance: propTypes.number,
  collateralValue: propTypes.number,
  loan: propTypes.number,
  stabilityFees: propTypes.number,
  stabilityFeesFull: propTypes.number,
  collateralRatio: propTypes.number,
  liquidatablePrice: propTypes.number,
});
