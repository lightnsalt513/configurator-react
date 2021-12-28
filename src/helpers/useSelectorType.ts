import { useSelector } from 'react-redux';
import { RootStateType } from 'state/reducers';

export function useSelectorTyped<T>(fn: (state: RootStateType) => T): T {
  return useSelector(fn);
}
