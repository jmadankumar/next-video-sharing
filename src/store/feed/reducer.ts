import {
  FeedActionTypes,
  FeedState,
  HIDE_CUSTOMIZE_CHANNEL_DIALOG,
  SET_FEED_CHANNEL,
  SHOW_CUSTOMIZE_CHANNEL_DIALOG,
} from './types';

const initialState: FeedState = {
  channel: null,
  openCustomizeChannelDialog: false,
};

export default function feedReducer(state = initialState, action: FeedActionTypes): FeedState {
  switch (action.type) {
    case SET_FEED_CHANNEL:
      return {
        ...state,
        channel: action.payload.channel,
      };
    case SHOW_CUSTOMIZE_CHANNEL_DIALOG:
      return {
        ...state,
        openCustomizeChannelDialog: true,
      };
    case HIDE_CUSTOMIZE_CHANNEL_DIALOG:
      return {
        ...state,
        openCustomizeChannelDialog: false,
      };
    default:
      return {
        ...state,
      };
  }
}
