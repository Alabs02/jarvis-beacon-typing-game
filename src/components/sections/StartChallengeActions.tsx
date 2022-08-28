import React, { Fragment, FC } from 'react';

// ICONS
import { IoRocket, IoReloadCircleSharp } from 'react-icons/io5';
import { RiAlarmWarningFill } from 'react-icons/ri';

// INTERFACES
import { IComponent } from '@/interfaces';

interface IProps extends IComponent.IStartChallengeActionsTypes {}

const StartChallengeActions: FC<IProps> = ({
  handleStart,
  hasEnded,
  hasStarted,
  setUserTime,
}) => {
  const handleReload = () => window.location.reload();

  return (
    <Fragment>
      <section className="wf-100 grid place-items-center mgy-50">
        {hasEnded && !hasStarted && (
          <Fragment>
            <button
              onClick={handleReload}
              type={'button'}
              className="btn btn-tonic"
            >
              <IoReloadCircleSharp fontSize={40} />
            </button>
            <div className="fs-14 text-uppercase mgt-10 fw-semi-bold text-tonic">
              Reload
            </div>
          </Fragment>
        )}

        {hasStarted && !hasEnded && (
          <Fragment>
            <button
              type={'button'}
              className="btn btn-accent btn--nopointer animate__animated animate__pulse animate__infinite"
            >
              <RiAlarmWarningFill fontSize={40} />
            </button>
            <div className="fs-14 text-uppercase mgt-10 fw-semi-bold text-accent-300">
              Hurry
            </div>
          </Fragment>
        )}

        {!hasStarted && !hasEnded && (
          <Fragment>
            <button
              onClick={handleStart}
              type={'button'}
              className="btn btn-success"
            >
              <IoRocket fontSize={40} />
            </button>
            <div className="fs-14 text-uppercase mgt-10 fw-semi-bold text-lemon-300">
              Start
            </div>
          </Fragment>
        )}

        {/* <div className="wf-100 mgt-10">
          <input type="time" className="form-control" onChange={(e) => setUserTime(e.target.value)} />
        </div> */}
      </section>
    </Fragment>
  );
};

export { StartChallengeActions as default };
