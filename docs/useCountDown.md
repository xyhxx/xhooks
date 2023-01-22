## useCountDown

> Countdown information. If you continue to configure days and other parameters after setting targetdate, they will be accumulated on the basis of targetdate.

```typescript
type DateType = string | number | Date;
type UseCountDownOptions = {
    targetDate?: DateType;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    interval?: number;
    onChange?: (time: number, parseTime: ReturnType<typeof parseDiffTime>) => void;
    onComplete?: () => void;
};
function useCountDown(options?: UseCountDownOptions): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
```

```tsx
 const App = function(){
  const {days, hours, minutes, seconds} = useCountDown({targetDate: new Date(2022 4 3)});

  return <p>{days}d{hours}h{minutes}m{seconds}s</p>
}
```