import {act, renderHook} from '@testing-library/react';
import {useRequestAnimationFrame} from '@src';

const fn = jest.fn();

function setup(fn: () => void, auto?: boolean) {
  return renderHook(
    () => useRequestAnimationFrame(fn, auto),
  );
}

describe('useRequestAnimationFrame', function() {
  beforeEach(() => fn.mockClear());

  it('useRequestAnimationFrame is defined', function() {
    expect(useRequestAnimationFrame).toBeDefined();
  });

  it('useRequestAnimationFrame is a function', function() {
    expect(useRequestAnimationFrame).toBeInstanceOf(Function);
  });

  it('will not trigger when auto is false', function() {
    const {result} = setup(fn);

    expect(result.current[0]).toBe(false);
    expect(fn).not.toBeCalled();
  });

  it('will trigger when auto is true', function() {
    jest.useFakeTimers();
    const {result} = setup(fn, true);

    expect(fn).not.toBeCalled();
    expect(result.current[0]).toBe(true);

    jest.advanceTimersByTime(12);
    expect(fn).not.toBeCalled();

    jest.advanceTimersByTime(4);
    expect(fn).toBeCalled();
  });

  it('state/actions shoule be right', function() {
    jest.useFakeTimers();

    const {result} = setup(fn);

    expect(fn).not.toBeCalled();
    expect(result.current[0]).toBe(false);

    jest.advanceTimersByTime(1000);

    expect(fn).not.toBeCalled();
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].start());

    jest.advanceTimersByTime(16);

    expect(fn).toBeCalledTimes(1);
    expect(result.current[0]).toBe(true);

    jest.advanceTimersByTime(16);
    expect(fn).toBeCalledTimes(2);

    jest.advanceTimersByTime(16);
    expect(fn).toBeCalledTimes(3);

    act(() => result.current[1].pause());

    jest.clearAllMocks();
    expect(result.current[0]).toBe(false);
    jest.advanceTimersByTime(1000);

    expect(fn).not.toBeCalled();
  });
});
