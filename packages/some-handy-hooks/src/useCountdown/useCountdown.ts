import * as React from 'react';

interface CountdownOptions {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  onFinish?: () => void;
}

const getCountdownEnd = (options: CountdownOptions, nowTimestamp: number) => {
  const {
    hours = 0, minutes = 0, seconds = 0, milliseconds = 0
  } = options;
  const initialTime = milliseconds + seconds * 1000 + minutes * 60 * 1000 + hours * 60 * 60 * 1000;
  return new Date(nowTimestamp + initialTime).getTime();
};

const useCountdown = (options: CountdownOptions) => {
  const { onFinish } = options;
  const now = Date.now();
  const [countdownEnd, setCountdownEnd] = React.useState(getCountdownEnd(options, now));
  const [countdown, setCountdown] = React.useState(countdownEnd - now);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const resume = () => {
    const newNow = Date.now();
    const newCountdownEnd = newNow + countdown;
    setCountdownEnd(newCountdownEnd);
  };

  const restart = () => {
    const newNow = Date.now();
    const newCountdownEnd = getCountdownEnd(options, newNow);
    setCountdown(newCountdownEnd - newNow);
    setCountdownEnd(newCountdownEnd);
  };

  const subtractTick = () => {
    const nextCountdown = countdownEnd - Date.now();
    if (nextCountdown > 0) {
      setCountdown(nextCountdown);
    } else {
      setCountdown(0);
      pause();
      if (onFinish) {
        onFinish();
      }
    }
  };

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(subtractTick, 1000);
    }
  };

  React.useEffect(() => {
    start();
    return pause;
  }, [countdownEnd]);

  return {
    start,
    pause,
    resume,
    restart,
    totalMilliseconds: countdown,
    totalSeconds: Math.floor(countdown / 1000),
    totalMinutes: Math.floor(countdown / (1000 * 60)),
    totalHours: Math.floor(countdown / (1000 * 60 * 60)),
    milliseconds: countdown % 1000,
    seconds: Math.floor((countdown % (1000 * 60)) / 1000),
    minutes: Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)),
    hours: Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  };
};

export default useCountdown;
