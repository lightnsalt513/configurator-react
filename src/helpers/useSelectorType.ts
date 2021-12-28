import { useSelector } from 'react-redux';
import { RootReducerType } from 'state/reducers';

export function useSelectorTyped<T>(fn: (state: RootReducerType) => T): T {
  return useSelector(fn);
}
