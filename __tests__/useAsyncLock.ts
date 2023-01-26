import {useAsyncLock} from '@src';
import {renderHook} from '@testing-library/react';

const fn = jest.fn();

function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function setup() {
  return renderHook(function() {
    async function asyncFunc(runRej = false) {
      return new Promise(function(res, rej) {
        setTimeout(function() {
          fn();
          const resultFn = runRej ? rej : res;
          resultFn('');
        }, 10);
      });
    }

    const res = useAsyncLock(asyncFunc);

    return res;
  });
}

describe('useAsyncLock', function() {
  beforeEach(() => fn.mockClear());

  it('useAsyncLock is defined', function() {
    expect(useAsyncLock).toBeDefined();
  });

  it('useAsyncLock is Function', function() {
    expect(useAsyncLock).toBeInstanceOf(Function);
  });

  it('useAsyncLock called number is right', async function() {
    const {result} = setup();

    expect(fn).not.toBeCalled();

    result.current();
    await sleep(3);
    expect(fn).not.toBeCalled();

    result.current();
    await sleep(2);
    expect(fn).not.toBeCalled();

    await sleep(5);
    expect(fn).toBeCalled();

    result.current();
    await sleep(5);
    expect(fn).toBeCalledTimes(1);

    await sleep(5);
    expect(fn).toBeCalledTimes(2);
  });

  it('useAsyncLock called number is right in reject', async function() {
    const {result} = setup();

    expect(fn).not.toBeCalled();

    result.current(true);
    await sleep(3);
    expect(fn).not.toBeCalled();

    result.current(true);
    await sleep(2);
    expect(fn).not.toBeCalled();

    await sleep(5);
    expect(fn).toBeCalled();

    result.current(true);
    await sleep(5);
    expect(fn).toBeCalledTimes(1);

    await sleep(5);
    expect(fn).toBeCalledTimes(2);
  });
});
