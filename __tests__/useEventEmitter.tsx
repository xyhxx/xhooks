import {useEventEmitter} from '@src';
import {act, fireEvent, render} from '@testing-library/react';
import {FC, useState} from 'react';

const KEY = 'test';

function setup() {
  const Son1: FC = function() {
    const [state, setState] = useState(0);

    const listener = (e: number | undefined) => setState(v => v + (e ?? 1));

    useEventEmitter(KEY, listener);

    return (
      <p data-testid='son1_state'>{state}</p>
    );
  };
  const Son2: FC = function() {
    const [state, setState] = useState(0);

    const listener = (e: number | undefined) => setState(v => v + (e ?? 1));

    useEventEmitter(KEY, listener, true);

    return (
      <p data-testid='son2_state'>{state}</p>
    );
  };
  const Son3: FC = function() {
    const fire = useEventEmitter(KEY);
    const fireNumber = useEventEmitter<number>(KEY);

    return (
      <>
        <button data-testid='btn' onClick={() => fire()} />
        <button data-testid='btn_number' onClick={() => fireNumber(2)} />
      </>
    );
  };
  const App: FC = () => (
    <>
      <Son1 />
      <Son2 />
      <Son3 />
    </>
  );

  return render(<App />);
}

describe('useEventEmitter', function() {
  it('useEventEmitter is defined', function() {
    expect(useEventEmitter).toBeDefined();
  });

  it('useEventEmitter is Function', function() {
    expect(useEventEmitter).toBeInstanceOf(Function);
  });

  it('listener is right', function() {
    const {getByTestId} = setup();

    const btn = getByTestId('btn');
    const state1 = getByTestId('son1_state');
    const state2 = getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('1');
    expect(state2.textContent).toBe('1');
  });

  it('once params is right', function() {
    const {getByTestId} = setup();

    const btn = getByTestId('btn_number');
    const state1 = getByTestId('son1_state');
    const state2 = getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('2');
    expect(state2.textContent).toBe('2');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('4');
    expect(state2.textContent).toBe('2');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('6');
    expect(state2.textContent).toBe('2');
  });

  it('params is right', function() {
    const {getByTestId} = setup();

    const btn = getByTestId('btn');
    const state1 = getByTestId('son1_state');
    const state2 = getByTestId('son2_state');

    expect(state1.textContent).toBe('0');
    expect(state2.textContent).toBe('0');

    fireEvent.click(btn);

    expect(state1.textContent).toBe('1');
    expect(state2.textContent).toBe('1');
  });

  it('test callback number', function() {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const Son1: FC = function() {
      const [state, setState] = useState(0);

      useEventEmitter<number | undefined>('KEY', function(e) {
        act(() => setState(v => v + (e ?? 1)));
        fn1();
      });

      return (
        <p data-testid='son1_state'>{state}</p>
      );
    };
    const Son2: FC = function() {
      const [state, setState] = useState(0);

      useEventEmitter<number | undefined>(
        'KEY2',
        function(e) {
          act(() => setState(v => v + (e ?? 1)));
          fn2();
        },
        true,
      );

      return (
        <p data-testid='son2_state'>{state}</p>
      );
    };
    const Son3: FC = function() {
      const fire = useEventEmitter('KEY');
      const fireNumber = useEventEmitter<number>('KEY2');

      return (
        <>
          <button data-testid='btns' onClick={() => fire()} />
          <button data-testid='btns_number' onClick={() => fireNumber(2)} />
        </>
      );
    };
    const App: FC = () => (
      <>
        <Son1 />
        <Son2 />
        <Son3 />
      </>
    );

    const {getByTestId} = render(<App />);

    const btn = getByTestId('btns');
    const btn2 = getByTestId('btns_number');

    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();

    fireEvent.click(btn);

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).not.toBeCalled();

    fireEvent.click(btn);
    fireEvent.click(btn2);

    expect(fn1).toBeCalledTimes(2);
    expect(fn2).toBeCalledTimes(1);

    fireEvent.click(btn);
    fireEvent.click(btn2);

    expect(fn1).toBeCalledTimes(3);
    expect(fn2).toBeCalledTimes(1);
  });
});
