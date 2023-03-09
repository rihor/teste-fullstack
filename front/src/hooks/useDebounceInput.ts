import { debounce } from "lodash";
import { ChangeEvent, useCallback } from "react";

type HandleFunction = (event: ChangeEvent<HTMLInputElement>) => void;

export function useDebounceInput<T = string>(
  callback: (value: T) => void,
  wait: number
): HandleFunction {
  const debouncedSearch = useCallback(
    debounce(value => {
      callback(value);
    }, wait),
    []
  );

  function handleAddressSearch(event: ChangeEvent<HTMLInputElement>) {
    debouncedSearch(event.target.value);
  }

  return handleAddressSearch
}
