import { AuthActionTypes, AuthState, LOGOUT, SET_USER } from './types';

const initialState: AuthState = {
  user: null,
  authenticated: false,
};

export default function authReducer(state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
      };
    default:
      return { ...state };
  }
}
