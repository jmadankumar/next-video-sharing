import { ChannelDTO } from '../../types/channel';
import { SearchResult } from '../../types/search';
import { VideoDTO } from '../../types/video';

export interface SearchState {
  results: {
    channels: ChannelDTO[];
    videos: VideoDTO[];
  };
}

export const SET_RESULTS = '@search/set-results';

export interface SetResultsAction {
  type: string;
  payload: {
    results: SearchResult;
  };
}

export type SearchActionTypes = SetResultsAction;
