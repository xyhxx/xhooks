import {MutableRefObject, useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {useBoolean, useLatest} from '.';
import {isEqual} from './utils';

export function useIntersectionObserver(options: {
  el: string | MutableRefObject<any>;
  onChange: (entry: IntersectionObserverEntry[]) => void;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}) {
  const {el, onChange, threshold, root, rootMargin} = options;
  const observer = useRef<IntersectionObserver | null>(null);
  const [isDispose, {setTrue: setDisposeTrue, setFalse: setDisposeFalse}] = useBoolean(false);
  const thresholdMemo = useRef(threshold);
  const listener = useLatest(onChange);

  const thresholds = useMemo(
    function() {
      const memo = thresholdMemo.current;

      if (isEqual(memo, threshold))
        return memo;

      return (thresholdMemo.current = threshold);
    },
    [threshold],
  );

  const connect = useCallback<() => void>(function() {
    setDisposeFalse();
  }, [setDisposeFalse]);

  const disconnect = useCallback<() => void>(function() {
    setDisposeTrue();
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, [setDisposeTrue]);

  useLayoutEffect(
    function() {
      if (isDispose) return;

      function initObserver() {
        observer.current = new IntersectionObserver(listener.current, {
          threshold: thresholds,
          root: root?.current,
          rootMargin,
        });

        let els: Element[] = [];

        if (typeof el === 'string')
          els = Array.from(document.querySelectorAll(el));
        else
          els = [el.current];

        for (let i = 0; i < els.length; i++)
          observer.current.observe(els[i]);
      }

      initObserver();

      return function() {
        observer.current?.disconnect();
        observer.current = null;
      };
    },
    [el, isDispose, listener, root, rootMargin, thresholds],
  );

  return {connect, disconnect};
}
