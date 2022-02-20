import propTypes from 'prop-types';
import styled from './Peg.module.scss';

const Peg = ({ percents }) => {
  const remainder = 50 + (50 * percents) / 100;

  return (
    <div className={styled.peg}>
      <p className={styled.peg__title}>
        KUSD PRICE / PEG DEPTH - <b>$6.46</b> / <b>0,04 KUSD</b> (?)
      </p>
      <div
        className={styled.peg__progress}
        style={
          percents > 0
            ? {
                backgroundImage: `linear-gradient(to right, transparent 50%, red 50% ${remainder}%, transparent ${remainder}% )`,
              }
            : {
                backgroundImage: `linear-gradient(to right, transparent ${remainder}%, green ${remainder}% 50%, transparent 50% )`,
              }
        }
      >
        <div className={styled.peg__sep} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__separator} />
        <div className={styled.peg__sep} />
      </div>
      <span className={styled.peg__percents}>{percents}%</span>
    </div>
  );
};

export default Peg;

Peg.propTypes = {
  percents: propTypes.string.isRequired,
};
