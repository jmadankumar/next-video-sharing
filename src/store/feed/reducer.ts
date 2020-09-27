import { FeedActionTypes, FeedState, SET_FEED_CHANNEL } from './types';

const initialState: FeedState = {
  channel: null,
};

export default function feedReducer(state = initialState, action: FeedActionTypes) {
  switch (action.type) {
    case SET_FEED_CHANNEL:
      return {
        ...state,
        channel: action.payload.channel,
      };
    default:
      return {
        ...state,
      };
  }
}
