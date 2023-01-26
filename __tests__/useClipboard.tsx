import {useClipboard} from '@src';
import {act, fireEvent, render, renderHook, waitFor} from '@testing-library/react';
import {FC, useState} from 'react';

let clipText = '';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText(text: string | number) {
      clipText = text.toString();
      return Promise.resolve(text);
    },
    readText() {
      return Promise.resolve(clipText);
    },
  },
});

function setup() {
  return renderHook(() => useClipboard());
}

describe('useClipboard', function() {
  beforeEach(() => (clipText = ''));

  it('useClipboard is defined', function() {
    expect(useClipboard).toBeDefined();
  });

  it('useClipboard is Function', function() {
    expect(useClipboard).toBeInstanceOf(Function);
  });

  test('copy text', async function() {
    const {result} = setup();

    const {
      current: [, {copyToClipboard, getClipboard}],
    } = result;

    await copyToClipboard('test');

    const data = await getClipboard();

    expect(data).toBe('test');
  });

  test('copy text by input', async function() {
    const App: FC = function() {
      const [ref, {copyToClipboard, getClipboard}] = useClipboard();
      const [clipboard, setClipboard] = useState('');

      async function setNewClipboard() {
        const data = await getClipboard();
        act(() => setClipboard(data));
      }

      return (
        <>
          <p data-testid='clipboard_data'>{clipboard}</p>
          <input ref={ref} data-testid='input_dom' />
          <button data-testid='copy_dom' onClick={() => copyToClipboard()}>
            copyDom
          </button>
          <button data-testid='copy' onClick={() => copyToClipboard('test-arg')}>
            copy
          </button>
          <button data-testid='set_clipboard' onClick={setNewClipboard}>
            set
          </button>
        </>
      );
    };

    const {getByTestId} = render(<App />);

    const copyDom = getByTestId('copy_dom');
    const copyBtn = getByTestId('copy');
    const setBtn = getByTestId('set_clipboard');
    const input = getByTestId('input_dom');

    act(function() {
      fireEvent.click(setBtn);
    });

    const clipData = getByTestId('clipboard_data');
    const text = clipData.innerHTML;

    expect(text).toBe('');

    fireEvent.input(input, {target: {value: 'test_demo'}});
    fireEvent.click(copyDom);
    fireEvent.click(setBtn);

    await waitFor(function() {
      expect(getByTestId('clipboard_data').innerHTML).toBe('test_demo');
    });

    fireEvent.click(copyBtn);
    fireEvent.click(setBtn);

    await waitFor(function() {
      expect(getByTestId('clipboard_data').innerHTML).toBe('test-arg');
    });

    fireEvent.input(input, {target: {value: 'input-clipbard'}});
    fireEvent.click(copyDom);
    fireEvent.click(setBtn);

    await waitFor(function() {
      expect(getByTestId('clipboard_data').innerHTML).toBe('input-clipbard');
    });
  });
});
