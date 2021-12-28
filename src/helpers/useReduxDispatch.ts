import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { RootStateType } from 'state/reducers';

export type ReduxDispatch = ThunkDispatch<RootStateType, any, AnyAction>;
export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
