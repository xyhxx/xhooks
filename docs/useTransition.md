## useTransition

> switch between tow values with the easing function

```typescript
type UseTransitionOptions = {
    duration?: number;
    delay?: number;
    transition?: EasingFunctionOrList;
    onComplete?: () => void;
};
function useTransition(value: number, options?: UseTransitionOptions): number;
function useTransition(value: number[], options?: UseTransitionOptions): number[];
```

```tsx
const App = function() {
  const [state, setState] = useState(0);
  const result = useTransition(state);

  function onClick() {
    setState(val => val === 10 ? 0 : 10);
  }

  return <>
    <p>{result}</p>
    <button onClick={onClick}>click</button>
  </>
}
```