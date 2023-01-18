import {useCallback, useState} from 'react';
import {useLatest} from './useLatest';

export function useMap<K, V>(
  initState?: Iterable<[K, V]>,
): [
  state: Map<K, V>,
  action: {
    set: (key: K, value: V) => void;
    setAll: (val: Iterable<[K, V]>) => void;
    clear: () => void;
    reset: () => void;
    remove: (key: K) => void;
  }
  ] {
  const getInitState = useLatest(function() {
    return initState;
  });

  const [map, setMap] = useState(function() {
    return initState ? new Map(getInitState.current()) : new Map();
  });

  const set = useCallback(function(key: K, value: V) {
    setMap(function(prevMap) {
      const nextMap = new Map(prevMap);
      nextMap.set(key, value);

      return nextMap;
    });
  }, []);

  const setAll = useCallback(function(list: Iterable<[K, V]>) {
    setMap(function(prevMap) {
      const nextMap = new Map(prevMap);

      for (const [key, value] of list)
        nextMap.set(key, value);

      return nextMap;
    });
  }, []);

  const remove = useCallback(
    function(key: K) {
      setMap(function(prevMap) {
        const result = prevMap.delete(key);

        return result ? new Map(prevMap) : prevMap;
      });
    },
    [],
  );

  const clear = useCallback(
    function() {
      setMap(function() {
        return new Map();
      });
    },
    [],
  );

  const reset = useCallback(
    function() {
      setMap(new Map(getInitState.current()));
    },
    [getInitState],
  );

  return [
    map,
    {
      set,
      setAll,
      remove,
      clear,
      reset,
    },
  ];
}
