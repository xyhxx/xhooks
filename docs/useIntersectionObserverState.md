## useIntersectionObserverState

> Return the contents of the IntersectionObserver API callback as state

``` ts
import { MutableRefObject } from 'react';
function useIntersectionObserverState(options: {
    el: string | MutableRefObject<any>;
    threshold?: number[];
    root?: MutableRefObject<any>;
    rootMargin?: string;
}): [
    state: IntersectionObserverEntry[],
    action: {
        connect: () => void;
        disconnect: () => void;
    }
];
```


``` tsx
const [state] = useIntersectionObserverState({ el: '.pDom' });

useEffect(
  function () {
    console.log(state);
  },
  [state],
);
```