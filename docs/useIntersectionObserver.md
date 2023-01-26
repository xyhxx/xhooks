## useIntersectionObserver

> Intersectionobserver API hook.If you want to disconnect listening, use disconnect. If you want to resume listening, use reconnect. If the listening content is not rebinding after DOM changes, you can call reconnect to listen again

``` ts
import { MutableRefObject } from 'react';
function useIntersectionObserver(options: {
    el: string | MutableRefObject<any>;
    onChange: (entry: IntersectionObserverEntry[]) => void;
    threshold?: number[];
    root?: MutableRefObject<any>;
    rootMargin?: string;
}): {
    connect: () => void;
    disconnect: () => void;
};
```

``` tsx
const { connect, disconnect } = useIntersectionObserver({
  el: '.pdom',
  onChange: function (entry) {
    console.log(entry);
  },
});
```