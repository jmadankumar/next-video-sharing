import { HomeActionTypes, HomeState, SET_VIDEO } from './types';

const initialState: HomeState = {
  videos: [],
};

export default function homeReducer(state = initialState, action: HomeActionTypes) {
  switch (action.type) {
    case SET_VIDEO:
      return {
        ...state,
        videos: action.payload.videos,
      };
    default:
      return { ...state };
  }
}
