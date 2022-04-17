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

export const mutatedDataType = propTypes.shape({
  balance: propTypes.string,
  collateralValue: propTypes.string,
  loan: propTypes.string,
  stabilityFees: propTypes.string,
  stabilityFeesFull: propTypes.string,
  collateralRatio: propTypes.string,
  liquidatablePrice: propTypes.string,
});
