import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {useLatest} from '.';

export type DateType = string | number | Date;
export type UseCountDownOptions = {
  targetDate?: DateType;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  interval?: number;
  onChange?: (time: number, parseTime: ReturnType<typeof parseDiffTime>) => void;
  onComplete?: () => void;
};

function getMillisecond(endTime?: DateType) {
  const start = dayjs();
  const end = dayjs(endTime);
  const diff = end.diff(start);

  return diff <= 0 ? 0 : diff;
}

function parseDiffTime(ms: number) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = Math.floor(ms % 1000);

  return {days, hours, minutes, seconds, milliseconds};
}

export function useCountDown(options?: UseCountDownOptions) {
  const {targetDate, days, hours, minutes, seconds, onChange, onComplete, interval}
    = options || {};

  const completeFn = useLatest(onComplete);
  const changeFn = useLatest(onChange);
  const endTargetDate = useMemo(
    function() {
      let date = dayjs(targetDate);

      function addTime(val?: number, unit?: dayjs.ManipulateType) {
        if (typeof val === 'number')
          date = date.add(val, unit);
      }

      addTime(days, 'day');
      addTime(hours, 'hour');
      addTime(minutes, 'minute');
      addTime(seconds, 'second');

      return date.toDate();
    },
    [targetDate, days, hours, minutes, seconds],
  );
  const intervalTime = useMemo(
    function() {
      return !interval || interval <= 0 ? 1000 : interval;
    },
    [interval],
  );
  const [time, setTime] = useState(0);

  useEffect(
    function() {
      let timer: NodeJS.Timer;
      function getDiff() {
        const diff = getMillisecond(endTargetDate);

        setTime(diff);
        changeFn.current?.(diff, parseDiffTime(diff));

        if (diff <= 0) {
          completeFn.current?.();
          clearInterval(timer);
        }

        return diff;
      }

      const diff = getDiff();

      diff > 0 && (timer = setInterval(getDiff, intervalTime));

      return function() {
        clearInterval(timer);
      };
    },
    [changeFn, completeFn, endTargetDate, intervalTime],
  );

  const resultTime = useMemo(
    function() {
      return parseDiffTime(time);
    },
    [time],
  );

  return resultTime;
}

