import API from '../helper/api';
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

const LoggedUserService = {
  getProfileDetail,
};

export default LoggedUserService;
