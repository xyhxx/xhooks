## useRequestAnimationFrame

> Map Hook

```typescript
function useRequestAnimationFrame(fn: (timestamp: number) => void, auto?: boolean): [
  isActive: boolean,
  actions: {
    start: () => void;
    pause: () => void;
  }
];
```

```tsx
const [isActive, {start, pause}] = useRequestAnimationFrame(function() {
  ...dosomething
})
```