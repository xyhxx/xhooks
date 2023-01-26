## useBroadcastChannel

> BroadcastChannel Web API

``` ts
function useBroadcastChannel<T>(name: string, options?: {
    onMessage?: (e: MessageEvent<T>) => void;
    onError?: (e: MessageEvent<any>) => void;
}): [
    state: {
        data: T | null;
        error: MessageEvent<any> | null;
    },
    action: {
        postMessage: <P>(data: P) => void;
        close: () => void;
    }
];

```

``` tsx
function onErrorfunction(e: MessageEvent<any>) {
  console.log(e);
};

const [{ data }, { postMessage }] = useBroadcastChannel<number>('channelName', { onError });

function post() {
  postMessage(1234);
}
```