import {act, renderHook} from '@testing-library/react';
import {useBoolean} from '@src';

function setup(initState?: boolean) {
  return renderHook(() => useBoolean(initState));
}

describe('useBoolean', function() {
  it('useBoolean is defined', function() {
    expect(useBoolean).toBeDefined();
  });

  it('uesBoolean is Function', function() {
    expect(useBoolean).toBeInstanceOf(Function);
  });

  it('init state is right', function() {
    let {result} = setup();

    expect(result.current[0]).toBe(false);
    expect(result.current[1].setFalse).toBeInstanceOf(Function);
    expect(result.current[1].setTrue).toBeInstanceOf(Function);
    expect(result.current[1].toggle).toBeInstanceOf(Function);

    ({result} = setup(false));
    expect(result.current[0]).toBe(false);

    ({result} = setup(true));
    expect(result.current[0]).toBe(true);
  });

  it('actions is right', function() {
    const {result} = setup();
    const [, {setTrue, setFalse, toggle}] = result.current;

    act(() => setTrue());
    expect(result.current[0]).toBe(true);

    act(() => setFalse());
    expect(result.current[0]).toBe(false);

    act(() => toggle());
    expect(result.current[0]).toBe(true);

    act(() => toggle());
    expect(result.current[0]).toBe(false);
  });

  it('actions shoule be memoryed', function() {
    const {result} = setup();
    const [, {setTrue, setFalse, toggle}] = result.current;

    const prevSetTrue = setTrue,
          prevSetFalse = setFalse,
          prevToggle = toggle;

    act(() => toggle());

    expect(prevSetTrue).toBe(result.current[1].setTrue);
    expect(prevSetFalse).toBe(result.current[1].setFalse);
    expect(prevToggle).toBe(result.current[1].toggle);
  });
});
