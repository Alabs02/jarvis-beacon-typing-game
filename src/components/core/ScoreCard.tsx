import React, { Fragment, FC } from 'react';

// INTERFACES
import { IComponent } from '@/interfaces';

interface IProps extends IComponent.IScoreCard {}; 

const ScoreCard: FC<IProps> = ({
  copy,
  styles,
  score,
  symbol
}) => {
  return (
    <Fragment>
      <div className="score-card">
        <div className="score-card__copy">{copy}</div>
        <div className="score-card__score fw-bold">
          {score}
          <sup className="score-card__sup fs-12 mgl-2 text-accent-300">{symbol}</sup>
        </div>
      </div>
    </Fragment>
  );
}

export { ScoreCard as default };