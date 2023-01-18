import {useCallback, useState} from 'react';
import {useLatest} from './useLatest';

export function useSet<T>(initState?: Iterable<T>): [
  state: Set<T>,
  action: {
    add: (value: T) => void;
    clear: () => void;
    remove: (value: T) => void;
    reset: () => void;
    addAll: (val: Iterable<T>) => void;
  }
] {
  const getInitState = useLatest(() => initState);
  const [set, setSet] = useState(() => new Set(initState));

  const add = useCallback(
    function(val: T) {
      setSet(function(prevSet) {
        const nextSet = new Set(prevSet);
        nextSet.add(val);

        return nextSet;
      });
    },
    [],
  );
  const addAll = useCallback(
    function(val: Iterable<T>) {
      setSet(function(prevSet) {
        const nextSet = new Set(prevSet);
        for (const el of val)
          nextSet.add(el);

        return nextSet;
      });
    },
    [],
  );
  const remove = useCallback(
    function(val: T) {
      setSet(function(prevSet) {
        const result = prevSet.delete(val);

        return result ? new Set(prevSet) : prevSet;
      });
    },
    [],
  );

  const clear = useCallback(() => setSet(new Set()), []);
  const reset = useCallback(
    function() {
      setSet(() => new Set(getInitState.current()));
    },
    [getInitState],
  );

  return [set, {add, remove, clear, reset, addAll}];
}
