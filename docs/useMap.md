## useMap

> Map Hook

```typescript
function useMap<K, V>(initState?: Iterable<[K, V]>): [
    state: Map<K, V>,
    action: {
        set: (key: K, value: V) => void;
        setAll: (val: Iterable<[K, V]>) => void;
        clear: () => void;
        reset: () => void;
        remove: (key: K) => void;
    }
];
```

```tsx
function App() {
  const [map, {set}] = useMap([['first', 1]]);

  function onClick() {
    set('second', 2);
  }

  return <>
    <p>{map.get('second') ?? 'no data'}</p>
    <button onClick={onClick}>click</button>
  </>;
}
```