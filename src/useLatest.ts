import {useEffect, useRef, MutableRefObject} from 'react';

export function useLatest<T>(initState: T): MutableRefObject<T> {
  const ref = useRef(initState);

  useEffect(function() {
    ref.current = initState;
  });

  return ref;
}

