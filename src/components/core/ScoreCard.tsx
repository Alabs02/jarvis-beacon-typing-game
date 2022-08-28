import React, { Fragment, FC } from 'react';
import classNames from 'classnames';

// INTERFACES
import { IComponent } from '@/interfaces';

interface IProps extends IComponent.IScoreCard {}

const ScoreCard: FC<IProps> = ({ copy, styles = {}, score, symbol }) => {
  return (
    <Fragment>
      <div className="score-card">
        <div className="score-card__copy">{copy}</div>
        <div className={classNames("score-card__score fw-bold", styles)}>
          {score}
          <sup className="score-card__sup fs-12 mgl-2 text-accent-300">
            {symbol}
          </sup>
        </div>
      </div>
    </Fragment>
  );
};

export { ScoreCard as default };
