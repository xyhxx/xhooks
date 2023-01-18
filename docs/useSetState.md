## useSetState

> update state like this.setState

```typescript
export declare function useSetState<
  T extends Record<any, any>
>(initState?: T | (() => T)): [
  T, 
  (patch: T | ((state: T) => T)) => void
];

```

```tsx
const [state, setState] = useSetState({name: 'simon', age: 12});

setState({name: 'david'}); // {name: 'david', age: 12}
setState((state) => ({age: state.age + 1})); // {name: 'david', age: 13}
```