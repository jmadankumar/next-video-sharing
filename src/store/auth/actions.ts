import { Dispatch } from 'redux';
import { UserDTO } from '../../types/user';
import { SetUserAction, SET_USER } from './types';

export const setUser = (user: UserDTO) => (dispath: Dispatch<SetUserAction>) => {
  dispath({
    type: SET_USER,
    payload: {
      user,
    },
  });
};
