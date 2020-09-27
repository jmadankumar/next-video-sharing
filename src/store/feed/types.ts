import { ChannelDTO } from '../../types/channel';

export interface FeedState {
  channel: ChannelDTO | null;
}

export const SET_FEED_CHANNEL = '@feed/set-feed-channel';

export interface SetFeedChannelAction {
  type: typeof SET_FEED_CHANNEL;
  payload: {
    channel: ChannelDTO;
  };
}

export type FeedActionTypes = SetFeedChannelAction;
