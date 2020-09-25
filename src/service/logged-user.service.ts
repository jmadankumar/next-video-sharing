import API from '../helper/api';
import { UserDTO } from '../types/user';

interface GetProfileDetailResponse {
  user: UserDTO;
}

const getProfileDetail = async (token?: string): Promise<UserDTO> => {
  const response = await API.get<GetProfileDetailResponse>('/me', {
    headers: {
      'x-authentication-token': token,
    },
  });
  return response.data.user;
};

const LoggedUserService = {
  getProfileDetail,
};

export default LoggedUserService;
