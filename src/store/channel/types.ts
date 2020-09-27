import { ChannelDTO } from '../../types/channel';

export interface ChannelState {
  channel: ChannelDTO | null;
}

export const SET_CHANNEL = '@channel/set-channel';

export interface SetChannelAction {
  type: typeof SET_CHANNEL;
  payload: {
    channel: ChannelDTO;
  };
}

export type ChannelActionTypes = SetChannelAction;
