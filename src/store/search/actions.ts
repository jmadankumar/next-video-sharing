import { SearchResult } from '../../types/search';
import { SetResultsAction, SET_RESULTS } from './types';

export const setResults = (results: SearchResult): SetResultsAction => {
  return {
    type: SET_RESULTS,
    payload: { results },
  };
};
