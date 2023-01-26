import {useCallback, useRef} from 'react';
import {useLatest} from '.';

export function useAsyncLock<T, R>(
  fn: (params?: T) => Promise<R>,
): (params?: T) => Promise<R | undefined> {
  const isLocked = useRef(false);
  const func = useLatest(fn);

  const lockFn = useCallback(
    async function(params?: T) {
      if (isLocked.current) return;

      isLocked.current = true;
      try {
        const result = await func.current(params);
        // eslint-disable-next-line require-atomic-updates
        isLocked.current = false;

        return result;
      } catch {
        isLocked.current = false;
      }
    },
    [func],
  );

  return lockFn;
}
