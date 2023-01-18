import {act, renderHook} from '@testing-library/react';
import {useSet} from '@src';

function setup<V>(initState: Iterable<V>) {
  return renderHook(
    function() {
      return useSet(initState);
    },
  );
}

describe('useSet', function() {
  it('useSet is defined', function() {
    expect(useSet).toBeDefined();
  });

  it('initState is right and state/action type is right', function() {
    const {result} = setup([1, 2, 3, 4]);
    const [set, {add, addAll, remove, reset, clear}] = result.current;

    expect(set.size).toBe(4);
    expect(set.has(1)).toBe(true);

    expect(set).toBeInstanceOf(Set);
    expect(addAll).toBeInstanceOf(Function);
    expect(add).toBeInstanceOf(Function);
    expect(remove).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
    expect(reset).toBeInstanceOf(Function);
  });

  it('add/addAll is right', function() {
    const {result} = setup([1, 2]);
    const [, {add, addAll}] = result.current;

    act(() => add(3));
    expect(result.current[0].has(3)).toBeTruthy();

    act(() => addAll([4, 5, 6]));
    expect(result.current[0].size).toBe(6);
  });

  it('remove/reset/clear is right', function() {
    const {result} = setup([1, 2, 3, 4, 5]);
    const [, {remove, reset, clear}] = result.current;

    act(() => remove(1));
    expect(result.current[0].has(1)).toBeFalsy();
    expect(result.current[0].size).toBe(4);

    act(() => clear());
    expect(result.current[0].size).toBe(0);

    act(() => reset());
    expect(result.current[0].size).toBe(5);
  });

  it('actions shoule be memoryed', function() {
    const {result} = setup([['first', 1], ['second', 2], ['third', 3]]);
    const [,{add, addAll, remove, reset, clear}] = result.current;
    const prevAdd = add,
          prevAddAll = addAll,
          prevRemove = remove,
          prevReset = reset,
          prevClear = clear;

    act(() => clear());

    expect(result.current[1].add).toBe(prevAdd);
    expect(result.current[1].addAll).toBe(prevAddAll);
    expect(result.current[1].remove).toBe(prevRemove);
    expect(result.current[1].reset).toBe(prevReset);
    expect(result.current[1].clear).toBe(prevClear);
  });
});
