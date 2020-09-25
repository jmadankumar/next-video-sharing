import { UserDTO } from '../../types/user';
import { LOGOUT, LogoutAction, SetUserAction, SET_USER } from './types';

export const setUser = (user: UserDTO): SetUserAction => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

export const logout = (): LogoutAction => {
  return { type: LOGOUT };
};
