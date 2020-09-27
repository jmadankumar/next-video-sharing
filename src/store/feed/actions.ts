import { ChannelDTO } from '../../types/channel';
import { SetFeedChannelAction, SET_FEED_CHANNEL } from './types';

export const setFeedChannel = (channel: ChannelDTO): SetFeedChannelAction => {
  return {
    type: SET_FEED_CHANNEL,
    payload: {
      channel,
    },
  };
};
