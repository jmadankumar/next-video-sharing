import API from '../helper/api';
import { getErrorMessage } from '../helper/axios';
import { ChannelDTO } from '../types/channel';
import { UserDTO } from '../types/user';

interface GetProfileDetailResponse {
  user: UserDTO;
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
    const headers: { [key: string]: any } = {};
    if (token) {
      headers['x-authentication-token'] = token;
    }

    const {
      data: { channel },
    } = await API.get<GetMyChannelResponse>(`/me/channel`, {
      headers,
    });
    result.channel = channel;
  } catch (error) {
    result.error = getErrorMessage(error);
    console.log(result);
  }
  return result;
};

const LoggedUserService = {
  getProfileDetail,
  getMyChannel,
};

export default LoggedUserService;
