import {useMemo, useState, useCallback, useLayoutEffect} from 'react';
import {useLatest} from '.';

export function useBroadcastChannel<T>(
  name: string,
  options?: {
    initState?: T,
    onMessage?: (e: MessageEvent<T>) => void;
    onError?: (e: MessageEvent<any>) => void;
  },
): [
  state: {data: T | undefined; error: MessageEvent<any> | undefined},
  action: {postMessage: (data: T) => void; close: () => void}
  ] {
  const {onMessage, onError, initState} = options ?? {};
  const channel = useMemo(() => new BroadcastChannel(name), [name]);
  const [data, setData] = useState<T | undefined>(initState);
  const [error, setError] = useState<MessageEvent<any> | undefined>(void 0);
  const messageCallback = useLatest(onMessage);
  const errorCallback = useLatest(onError);

  const postMessage = useCallback(
    function(data: T) {
      channel.postMessage(data);
    },
    [channel],
  );

  const close = useCallback<() => void>(
    function() {
      channel.close();
    },
  [channel],
  );

  useLayoutEffect(
    function() {
      const bc = channel;

      function message(e: MessageEvent<T>) {
        setData(e.data);
        messageCallback.current?.(e);
      }

      function error(e: MessageEvent<any>) {
        setError(e);
        errorCallback.current?.(e);
      }

      bc.addEventListener('message', message);
      bc.addEventListener('messageerror', error);

      return function() {
        bc.removeEventListener('message', message);
        bc.removeEventListener('messageerror', error);
      };
    },
    [channel, errorCallback, messageCallback],
  );

  return [
    {data, error},
    {postMessage, close},
  ];
}
