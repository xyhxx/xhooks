## useBoolean

> manage state of boolean

```typescript
function useBoolean(initState?: boolean): [
    state: boolean,
    actions: {
        setTrue: () => void;
        setFalse: () => void;
        toggle: () => void;
    }
];
```

```tsx
function App() {
  const [state, {toggle, setTrue}] = useBoolean();

  return <>
    <p>value is {state.toString()}</p>
    <button onClick={toggle}>toggle</button>
  </>
}
```