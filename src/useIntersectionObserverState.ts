import {MutableRefObject, useState, useCallback} from 'react';
import {useIntersectionObserver} from '.';

export function useIntersectionObserverState(options: {
  el: string | MutableRefObject<any>;
  threshold?: number[];
  root?: MutableRefObject<any>;
  rootMargin?: string;
}): [
  state: IntersectionObserverEntry[],
  action: {connect: () => void; disconnect: () => void}
  ] {
  const [state, setState] = useState<IntersectionObserverEntry[]>([]);

  const onChange = useCallback(function(e: IntersectionObserverEntry[]) {
    setState(e);
  }, []);

  const {connect, disconnect} = useIntersectionObserver({
    ...options,
    onChange,
  });

  return [state, {connect, disconnect}];
}
