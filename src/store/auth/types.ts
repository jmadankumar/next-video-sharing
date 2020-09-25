import { AnyAction } from 'redux';
import { UserDTO } from '../../types/user';

export interface AuthState {
  user: UserDTO | null;
  authenticated: boolean;
}

export const SET_USER = '@auth/set-user';
export const LOGOUT = '@auth/logout';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: {
    user: UserDTO;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}
export type AuthActionTypes = SetUserAction | LogoutAction;
