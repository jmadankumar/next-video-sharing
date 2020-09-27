import { ChannelDTO } from '../../types/channel';
import { ChannelActionTypes, SET_CHANNEL } from './types';

export const setChannel = (channel: ChannelDTO): ChannelActionTypes => {
  return {
    type: SET_CHANNEL,
    payload: {
      channel,
    },
  };
};
