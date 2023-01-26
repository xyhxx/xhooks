import {useRef, useCallback, RefObject} from 'react';

export function useClipboard(): [
  ref: RefObject<HTMLInputElement>,
  actions: {
    copyToClipboard: (text?: string | number | null) => Promise<string | number>,
    getClipboard: () => Promise<string>,
  }
] {
  const ref = useRef<HTMLInputElement>(null);

  const copyToClipboard = useCallback(function(text?: string | number | null) {
    return new Promise<string | number>(function(res, rej) {
      try {
        let copyText = text;

        if (!copyText)
          copyText = ref.current?.value;

        if (!copyText) {
          const error = 'The copied content cannot be empty';
          rej(error);
          return;
        }

        if (typeof copyText !== 'string' && typeof copyText !== 'number') {
          const error = 'The copied content must be a string or a number';
          rej(error);
          return;
        }

        navigator.clipboard
          .writeText(copyText.toString())
          .then(function() {
            res(copyText as string | number);
          })
          .catch(function(err) {
            rej(err);
          });
      } catch (error) {
        rej(error);
      }
    });
  }, []);

  const getClipboard = useCallback(function() {
    return navigator.clipboard.readText();
  }, []);

  return [ref, {copyToClipboard, getClipboard}];
}
