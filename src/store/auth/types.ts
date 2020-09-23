import { AnyAction } from 'redux';
import { UserDTO } from '../../types/user';

export interface AuthState {
  user: UserDTO | null;
}

export const SET_USER = '@auth/set-user';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: {
    user: UserDTO;
  };
}

export type AuthActionTypes = SetUserAction;
