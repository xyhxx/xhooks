import {renderHook} from '@testing-library/react';
import {useLatest} from '@src';

function setup<T>(initState: T) {
  return renderHook(
    state => useLatest(state),
    {initialProps: initState},
  );
}

describe('useLatest', function() {
  it('useLatest is defined', function() {
    expect(useLatest).toBeDefined();
  });

  it('current value is right', function() {
    const {result} = setup(0);

    expect(result.current.current).toBe(0);
  });

  it('current value is latest', function() {
    const {result, rerender} = setup<any>(0);

    expect(result.current.current).toBe(0);

    rerender(1);
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);

    function testFn() {
      /** empty */
    }
    rerender(testFn);
    expect(result.current.current).toBe(testFn);

    const testObj = {a: 1};
    rerender(testObj);
    expect(result.current.current).toBe(testObj);
  });
});
