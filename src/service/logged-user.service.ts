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

interface UpdateChannelOption {
  name: string;
}
interface UpdateChannelResponse {
  message: string;
}
interface UpdateChannelResult {
  message?: string;
  error?: string;
}

const updateMyChannel = async (option: UpdateChannelOption): Promise<UpdateChannelResult> => {
  const result: UpdateChannelResult = {};
  try {
    const response = await API.put<UpdateChannelResponse>('/me/channel', { ...option });
    result.message = response.data.message;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

interface UploadProfileImageOption {
  file: File;
  onUploadProgress?: (event: any) => void;
}
interface UploadProfileImageResult {
  message?: string;
  error?: string;
}

interface UploadProfileImageResponse {
  message: string;
}
const uploadProfileImage = async ({
  file,
  onUploadProgress,
}: UploadProfileImageOption): Promise<UploadProfileImageResult> => {
  const result: UploadProfileImageResult = {};
  try {
    const data = new FormData();
    data.append('file', file);
    const response = await API.put<UploadProfileImageResponse>(
      '/me/channel/upload-profile-image',
      data,
      {
        onUploadProgress: (event) => {
          console.log(event);
          onUploadProgress?.((event.loaded / event.total) * 100);
        },
      },
    );
    result.message = response.data.message;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

interface UploadCoverImageOption {
  file: File;
  onUploadProgress?: (event: any) => void;
}
interface UploadCoverImageResult {
  message?: string;
  error?: string;
}

interface UploadCoverImageResponse {
  message: string;
}

const uploadCoverImage = async ({
  file,
  onUploadProgress,
}: UploadCoverImageOption): Promise<UploadCoverImageResult> => {
  const result: UploadProfileImageResult = {};
  try {
    const data = new FormData();
    data.append('file', file);
    const response = await API.put<UploadCoverImageResponse>(
      '/me/channel/upload-cover-image',
      data,
      {
        onUploadProgress: (event) => {
          console.log(event);
          onUploadProgress?.((event.loaded / event.total) * 100);
        },
      },
    );
    result.message = response.data.message;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

const LoggedUserService = {
  getProfileDetail,
  getMyChannel,
  updateMyChannel,
  uploadProfileImage,
  uploadCoverImage,
};

export default LoggedUserService;
