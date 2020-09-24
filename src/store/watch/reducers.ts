import { SET_WATCH_VIDEO, WatchActionTypes, WatchState } from './types';

const initialState: WatchState = {
  video: null,
};

export default function watchReducer(state = initialState, action: WatchActionTypes): WatchState {
  switch (action.type) {
    case SET_WATCH_VIDEO:
      return {
        ...state,
        video: action.payload.video,
      };
    default:
      return {
        ...state,
      };
  }
}
