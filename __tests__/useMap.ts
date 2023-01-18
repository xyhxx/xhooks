import {act, renderHook} from '@testing-library/react';
import {useMap} from '@src';

function setup<K, V>(initState: Iterable<[K, V]>) {
  return renderHook(
    function(init) {
      return useMap(init);
    },
    {initialProps: initState},
  );
}

describe('useMap', function() {
  it('useMap is defined', function() {
    expect(useMap).toBeDefined();
  });

  it('initState is right and state/action type is right', function() {
    const {result} = setup([['first', 1], ['second', 2]]);
    const [map, {set, setAll, remove, reset, clear}] = result.current;

    expect(map.size).toBe(2);
    expect(map.get('first')).toBe(1);
    expect(map.get('second')).toBe(2);

    expect(map).toBeInstanceOf(Map);
    expect(set).toBeInstanceOf(Function);
    expect(setAll).toBeInstanceOf(Function);
    expect(remove).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
    expect(reset).toBeInstanceOf(Function);
  });

  it('set/setAll is right', function() {
    const {result} = setup([['first', 1], ['second', 2]]);
    const [, {set, setAll}] = result.current;

    act(() => set('third', 3));
    expect(result.current[0].get('third')).toBe(3);

    act(() => setAll([['fourth', 4], ['fifth', 5]]));
    expect(result.current[0].get('fourth')).toBe(4);
    expect(result.current[0].get('fifth')).toBe(5);

    expect(result.current[0].size).toBe(5);
  });

  it('remove/reset/clear is right', function() {
    const {result} = setup([['first', 1], ['second', 2], ['third', 3]]);
    const [, {remove, reset, clear}] = result.current;

    act(() => remove('first'));
    expect(result.current[0].has('first')).toBe(false);
    expect(result.current[0].size).toBe(2);

    act(() => clear());
    expect(result.current[0].size).toBe(0);

    act(() => reset());
    expect(result.current[0].size).toBe(3);
  });

  it('actions shoule be memoryed', function() {
    const {result} = setup([['first', 1], ['second', 2], ['third', 3]]);
    const [,{set, setAll, remove, reset, clear}] = result.current;
    const prevSet = set,
          prevSetAll = setAll,
          prevRemove = remove,
          prevReset = reset,
          prevClear = clear;

    act(() => clear());

    expect(result.current[1].set).toBe(prevSet);
    expect(result.current[1].setAll).toBe(prevSetAll);
    expect(result.current[1].remove).toBe(prevRemove);
    expect(result.current[1].reset).toBe(prevReset);
    expect(result.current[1].clear).toBe(prevClear);
  });
});
