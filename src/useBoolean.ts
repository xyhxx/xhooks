import {useCallback, useState} from 'react';

export function useBoolean(initState = false): [
  state: boolean,
  actions: {
    setTrue: () => void,
    setFalse: () => void,
    toggle: () => void,
  }
] {
  const [state, setState] = useState(initState);

  const setTrue = useCallback(function() {
    setState(true);
  }, []);

  const setFalse = useCallback(function() {
    setState(false);
  }, []);

  const toggle = useCallback(function() {
    setState(val => !val);
  }, []);

  return [
    state,
    {setTrue, setFalse, toggle},
  ];
}
