## useSet

> Set Hook

```typescript
function useSet<T>(initState?: Iterable<T>): [
    state: Set<T>,
    action: {
        add: (value: T) => void;
        clear: () => void;
        remove: (value: T) => void;
        reset: () => void;
        addAll: (val: Iterable<T>) => void;
    }
];
```

```tsx
function App() {
  const [set, {add}] = useSet([1,2,3,4]);

  function onClick() {
    add(set.size + 1);
  }

  return <>
    <p>{set.size}</p>
    <button onClick={onClick}>click</button>
  </>;
}
```