import API from '../helper/api';
import { getErrorMessage } from '../helper/axios';
import { ChannelDTO } from '../types/channel';
import { UserDTO } from '../types/user';

interface GetProfileDetailResponse {
  user: UserDTO;
  subscriptions: ChannelDTO[];
}

const getProfileDetail = async (token?: string): Promise<GetProfileDetailResponse> => {
  const response = await API.get<GetProfileDetailResponse>('/me', {
    headers: {
      'x-authentication-token': token,
    },
  });
  return response.data;
};

interface GetMyChannelResult {
  channel?: ChannelDTO;
  error?: string;
}

interface GetMyChannelResponse {
  channel: ChannelDTO;
}

const getMyChannel = async (token?: string): Promise<GetMyChannelResult> => {
  const result: GetMyChannelResult = {};
  try {
    const {
      data: { channel },
    } = await API.get<GetMyChannelResponse>(`/me/channel`, {
      headers: {
        'x-authentication-token': token,
      },
    });
    result.channel = channel;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

const LoggedUserService = {
  getProfileDetail,
  getMyChannel,
};

export default LoggedUserService;
