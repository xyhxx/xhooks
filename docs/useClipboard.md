## useClipboard

> Clipboard API

``` ts
import { RefObject } from 'react';
function useClipboard(): [
    ref: RefObject<HTMLInputElement>,
    actions: {
        copyToClipboard: (text?: string | number | null) => Promise<string | number>;
        getClipboard: () => void;
    }
];
```

``` tsx
const Home = function () {
  const [ref, { copyToClipboard }] = useClipboard();

  return (
    <>
      <input ref={ref} value='copy value' />
      <button onClick={() => copyToClipboard()}>copy</button>
    </>
  );
};
```

``` tsx
const Home = function () {
  const [, { copyToClipboard }] = useClipboard();

  function copy() {
    copyToClipboard('copy msg');
  }

  return <button onClick={copy}>copy</button>;
};
```