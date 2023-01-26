## useAsyncLock

> Asynchronous function lock. When the asynchronous function is executed, it will not be executed again, and an undefind will be returned.

```typescript
function useAsyncLock<T, R>(fn: (params?: T) => Promise<R>): (params?: T) => Promise<R | undefined>;
```

```tsx
function asyncFn () {
  return new Promise(function (res) {
    setTimeout(function () {
      res('1234');
    }, 2000);
  });
};

const fn = useAsyncLock(asyncFn);
```