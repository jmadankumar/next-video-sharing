import { ChannelState, SET_CHANNEL, ChannelActionTypes } from './types';

const initialState: ChannelState = {
  channel: null,
};

export default function channelReducer(
  state = initialState,
  action: ChannelActionTypes,
): ChannelState {
  switch (action.type) {
    case SET_CHANNEL:
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
