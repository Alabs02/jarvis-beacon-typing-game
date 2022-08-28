import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react';
import { toast } from 'material-react-toastify';
import classNames from 'classnames';

// UTILS
import { helper } from '@/utils';

// STORE
import { useAppSelector, useAppDispatch } from '@/store';
import { updateScore } from '@/store/slices/score';

// COMPONENTS
import { ScoreCard } from '@/components/core';
import { StartChallengeActions } from '@/components/sections';

var interval: any;

const StartChallenge = () => {
  const dispatch = useAppDispatch();

  // STORE STATE
  const { payload, allowedKeys } = useAppSelector((state) => state.quote);
  const { scorePayload } = useAppSelector((state) => state.score);

  // REFS
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);

  // STATE
  const [duration, setDuration] = useState<number>(60);
  const [userTime, setUserTime] = useState<string>('');

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showField, setShowField] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [incorrectIndex, setIncorrectIndex] = useState<number>(0);

  const [lastScore, setLastScore] = useState<number>(0);

  const [chosenQuote, setChosenQuote] = useState<{
    quote: string;
    author: string;
  }>({
    quote: '',
    author: '',
  });
  const [inputValue, setInputValue] = useState<string>('');

  const [cpm, setCpm] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  const inputBoxClassnames: string = classNames(
    'quote-box quote-box__mono quote-box__input',
    {
      'quote-box--active': hasStarted,
      'quote-box--incactive': hasError,
    },
  );

  const wpmClassnames = {
    'wpm-bg__default': wpm < 1, 
    'score-card__score--tonic': wpm >= 1 && wpm < 20,
    'score-card__score--accent': wpm >= 20 && wpm < 40,
    'score-card__score--lemon': wpm >= 40
  };

  // HANDLERS
  const handleCompleted = () => {
    setHasEnded(true);
    setHasStarted(false);
    clearInterval(interval);
    toast.warning("You're time has elasped!");
  };

  const setTimer = () => {
    const now = Date.now();
    const seconds = now + duration * 1000;
    interval = setInterval(() => {
      const secondLeft = Math.round((seconds - Date.now()) / 1000);
      setDuration(secondLeft);
      if (secondLeft === 0) {
        handleCompleted();
      }
    }, 1000);
  };

  const handleStart = () => {
    setHasStarted(true);
    setHasEnded(false);
    setInputValue(chosenQuote.quote);
    inputRef.current?.focus();
    setTimer();
    setShowField(true);
    inputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { key } = e;
    const quoteCopy = chosenQuote.quote;
    console.log('Test:', key === quoteCopy.charAt(currentIndex));

    if (key === quoteCopy.charAt(currentIndex)) {
      setCurrentIndex(currentIndex + 1);
      const currentChar = quoteCopy.substring(
        currentIndex + 1,
        currentIndex + quoteCopy.length,
      );
      setInputValue(currentChar);
      setCorrectIndex(correctIndex + 1);
      setHasError(false);

      (outputRef as any).current.innerHTML += key;
    } else {
      if (allowedKeys.includes(key)) {
        setIncorrectIndex(incorrectIndex + 1);
        setHasError(false);

        (
          outputRef as any
        ).current.innerHTML += `<span class="text-tonic">${key}</span>`;
      }
    }

    const timeRemains: string = ((60 - duration) / 60).toFixed(2);
    const _accuracy = Math.floor(
      ((currentIndex - incorrectIndex) / currentIndex) * 100,
    );
    const _wpm = Math.round(correctIndex / 5 / parseFloat(timeRemains));

    if (currentIndex > 5) {
      setAccuracy(_accuracy);
      setCpm(correctIndex);
      setWpm(_wpm);
    }

    if (currentIndex + 1 === quoteCopy.length || incorrectIndex > 50) {
      handleCompleted();
    }
  };

  // UPDATE CHOSEN QUOTE & INPUT ON LOAD
  useEffect(() => {
    const selectedQuote = helper.getRandomQuote(payload);
    setChosenQuote(selectedQuote);
    setInputValue(selectedQuote.quote);
    inputRef.current?.click();
  }, []);

  useEffect(() => {
    setLastScore(scorePayload.lastScore);
  }, []);

  useEffect(() => {
    hasEnded &&
      dispatch(
        updateScore({
          lastScore: wpm,
        }),
      );
  }, [wpm, hasEnded, dispatch]);

  return (
    <Fragment>
      <div className="wf-100 d-flex justify-content-start justify-content-md-between">
        <div className="wf-100 wf-md-30">
          <ScoreCard
            copy={'wpm'}
            score={wpm}
            symbol={''}
            styles={wpmClassnames}
          />

          <ScoreCard copy={'cpm'} score={cpm} symbol={''} />

          <ScoreCard copy={'Last Score'} score={lastScore} symbol={''} />
        </div>

        <div className="wf-100 wf-md-60 d-flex flex-direction-col align-items-center">
          <h4 className="fw-bold fs-24">How Fast Can You Type?</h4>

          <div className="text-primary-300 mgy-20">
            Start the Typing speed test and find out how fast can you type in
            real world!
          </div>

          <div className="alert alert__accent">
            Just start typing and don&apos;t use backspace to correct your
            mistakes. Your mistakes will be marked in Red color and shown below
            the text box. Good luck!
          </div>

          <StartChallengeActions
            handleStart={handleStart}
            hasStarted={hasStarted}
            hasEnded={hasEnded}
            setUserTime={setUserTime}
            showField={showField}
          />

          {hasEnded && !hasStarted && (
            <div className="quote-box">
              <div className="quote-box__copy lh-24">
                &ldquo;
                {chosenQuote.quote}
                &ldquo;
              </div>

              <div className="quote-box__author mgt-10">
                - {chosenQuote.author}
              </div>
            </div>
          )}

          {hasStarted && !hasEnded && (
            <div
              className={inputBoxClassnames}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              id="textInput"
            >
              {inputValue}
            </div>
          )}

          {!hasStarted && !hasEnded && (
            <div
              className="quote-box quote-box__muted"
              tabIndex={-1}
              ref={inputRef}
            >
              {inputValue}
            </div>
          )}

          <div
            className="quote-box text-default-contrast lh-24 wf-100 mgt-20"
            ref={outputRef}
          ></div>
        </div>

        <div className="wf-100 wf-md-30 d-flex flex-direction-col align-items-end">
          <ScoreCard copy={'Timer'} score={duration} symbol={''} />

          <ScoreCard copy={'Errors'} score={incorrectIndex} symbol={''} />

          <ScoreCard copy={'Accuracy'} score={accuracy} symbol={'%'} />
        </div>
      </div>
    </Fragment>
  );
};

export { StartChallenge as default };
