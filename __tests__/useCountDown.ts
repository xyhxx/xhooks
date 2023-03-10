import {act, renderHook} from '@testing-library/react';
import {UseCountDownOptions, useCountDown} from '@src';

import dayjs from 'dayjs';

function setup(options?: UseCountDownOptions) {
  return renderHook(function() {
    return useCountDown(options);
  });
}

describe('useCountDown', function() {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  it('useCountDown is defined', function() {
    expect(useCountDown).toBeDefined();
  });

  it('useCountDown is function', function() {
    expect(useCountDown).toBeInstanceOf(Function);
  });

  it('useCountDown default state is right', function() {
    const {result} = setup();

    const {days, hours, minutes, seconds, milliseconds} = result.current;

    expect({days, hours, minutes, seconds, milliseconds}).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('useCountDown params', function() {
    const {result} = setup({hours: 1, days: 1, minutes: 2, seconds: 3});

    const {days, hours, minutes, seconds} = result.current;

    expect({days, hours, minutes, seconds}).toEqual({
      days: 1,
      hours: 1,
      minutes: 2,
      seconds: 3,
    });
  });

  test('test process', function() {
    const {result} = setup({targetDate: dayjs().add(3, 'd').toDate(), interval: 500});

    let {days, hours, minutes, seconds, milliseconds} = result.current;

    expect({days, hours, minutes, seconds, milliseconds}).toEqual({
      days: 3,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    act(function() {
      jest.advanceTimersByTime(1000);
    });

    ({days, hours, minutes, seconds, milliseconds} = result.current);

    expect({days, hours, minutes}).toEqual({
      days: 2,
      hours: 23,
      minutes: 59,
    });

    expect(seconds).toBeLessThanOrEqual(59);
    expect(milliseconds).toBeLessThan(1000);

    act(function() {
      jest.advanceTimersByTime(1000 * 60 * 3);
    });

    ({days, hours, minutes, seconds, milliseconds} = result.current);

    expect({days, hours, minutes}).toEqual({
      days: 2,
      hours: 23,
      minutes: 56,
    });

    expect(seconds).toBeLessThanOrEqual(59);
    expect(milliseconds).toBeLessThan(1000);
  });

  it('onComplete is right', function() {
    const completeFn = jest.fn();
    const changeFn = jest.fn();

    setup({
      onChange: changeFn,
      onComplete: completeFn,
      targetDate: dayjs().add(3, 's').toDate(),
      interval: 100,
    });

    expect(completeFn).not.toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(1);

    act(function() {
      jest.advanceTimersByTime(1000);
    });

    expect(completeFn).not.toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(11);

    act(function() {
      jest.advanceTimersByTime(1000 * 2);
    });

    expect(completeFn).toBeCalled();
    expect(changeFn).toHaveBeenCalledTimes(31);
  });
});

