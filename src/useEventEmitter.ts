import {useRef, useEffect, useCallback} from 'react';
import {useLatest} from '.';
import {EventBus} from './utils/events';

const event = new EventBus();

export function useEventEmitter<T>(key: string, listener?: (event: T) => void, once?: boolean) {
  const onceTragger = useRef(false);
  const fn = useLatest(listener);

  useEffect(
    function() {
      if (!fn.current) return;

      let cancel: (() => void) | null = null;

      if (once) {
        if (onceTragger.current) return;
        cancel = event.once<T>(key, function(e) {
          onceTragger.current = true;
          fn.current!(e);
        });
      } else
        cancel = event.on(key, fn.current);

      return function() {
        cancel?.();
      };
    },
    [fn, key, once],
  );

  return useCallback(
    (args?: T) => {
      event.emit(key, args);
    },
    [key],
  );
}
