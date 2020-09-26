import { SearchActionTypes, SearchState, SET_RESULTS } from './types';
import { SearchResult } from '../../types/search';

const initialState: SearchState = {
  results: {
    channels: [],
    videos: [],
  },
};

export default function searchReducer(
  state = initialState,
  action: SearchActionTypes,
): SearchState {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload.results,
      };
    default:
      return {
        ...state,
      };
  }
}
