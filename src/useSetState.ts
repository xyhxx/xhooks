import {shallow} from './utils';
import {useCallback, useRef, useState} from 'react';

export function useSetState<
  T extends Record<any, any>
>(initState: T | (() => T) = {} as T): [T, (patch: T | ((state: T) => T)) => void] {
  const [state, set] = useState(initState);
  const memoState = useRef(state);

  const setState = useCallback(function(patch: T | ((state: T) => T)) {
    const prevState = memoState.current;
    const nextState = typeof patch === 'function'
      ? Object.assign({}, prevState, patch(prevState))
      : Object.assign({}, prevState, patch);

    // Do not modify the data at the same time to prevent duplicate rendering
    !shallow(prevState, nextState) && set(() => (memoState.current = nextState));
  }, []);

  return [state, setState];
}
