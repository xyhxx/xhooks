## useLatest

> keep data values ​​always up to date

```typescript
function useLatest<T>(initState: T): MutableRefObject<T>;
```

```tsx
const fn = useLatest(function(){
  ...something
});

function onClick() {
  fn.current();
}
```