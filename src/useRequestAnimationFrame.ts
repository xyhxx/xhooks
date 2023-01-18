import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useLatest} from './useLatest';

export function useRequestAnimationFrame(fn: (timestamp: number) => void, auto = false): [
  isActive: boolean,
  actions: {
    start: () => void,
    pause: () => void,
  }
] {
  const frame = useRef<number>();
  const [isActive, setActive] = useState(auto);
  const callback = useLatest(fn);

  const loop = useCallback(
    function(timestamp: number) {
      if (!isActive) return;

      callback.current(timestamp);

      frame.current = requestAnimationFrame(loop);
    },
    [isActive, callback],
  );

  const pause = useCallback(
    function() {
      setActive(false);
    },
    [],
  );

  const start = useCallback(
    function() {
      setActive(true);
    },
    [],
  );

  useLayoutEffect(
    function() {
      switch (true) {
        case auto && isActive:
          !frame.current && (frame.current = requestAnimationFrame(loop));
          break;
        case isActive:
          !frame.current && (frame.current = requestAnimationFrame(loop));
          break;
        case !isActive:
          frame.current && cancelAnimationFrame(frame.current);
          break;
      }

      return function() {
        frame.current && cancelAnimationFrame(frame.current);
      };
    },
    [isActive, auto, loop],
  );

  return [isActive, {start, pause}];
}
