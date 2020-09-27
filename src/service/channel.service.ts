import API from '../helper/api';
import { getErrorMessage } from '../helper/axios';
import { ChannelDTO } from '../types/channel';

interface SubscribeResponse {
  message: string;
}

interface SubscribeResult {
  message?: string;
  error?: string;
}

const subscribe = async (channelId: string): Promise<SubscribeResult> => {
  const result: SubscribeResult = {};
  try {
    const response = await API.post<SubscribeResponse>(`/channel/${channelId}/subscribe`);
    result.message = response.data.message;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

interface GetChannelByIdResult {
  channel?: ChannelDTO;
  error?: string;
}

interface GetChannelByIdResponse {
  channel: ChannelDTO;
}

const getChannelById = async (channelId: string): Promise<GetChannelByIdResult> => {
  const result: GetChannelByIdResult = {};
  try {
    const {
      data: { channel },
    } = await API.get<GetChannelByIdResponse>(`/channel/${channelId}`);
    result.channel = channel;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

const ChannelService = {
  subscribe,
  getChannelById,
};

export default ChannelService;
