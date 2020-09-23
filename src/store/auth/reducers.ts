import { AuthActionTypes, AuthState, SET_USER } from './types';

const initialState: AuthState = {
  user: null,
};

export default function authReducer(state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return { ...state };
  }
}
