import API from '../helper/api';
import { getErrorMessage } from '../helper/axios';
import { SignupFormData } from '../types/form';
import { UserDTO } from '../types/user';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: UserDTO;
  token: string;
}

interface LoginResult {
  user?: UserDTO;
  error?: any;
}
const login = async (credentials: LoginRequest): Promise<LoginResult> => {
  const result: LoginResult = {};
  try {
    const response = await API.post<LoginResponse>('/auth/login', credentials);
    result.user = response.data.user;
  } catch (error) {
    result.error = getErrorMessage(error);
  }
  return result;
};

interface LogoutResponse {
  message: string;
}

const logout = async (): Promise<LogoutResponse> => {
  const response = await API.post<LogoutResponse>('/auth/logout');
  return response.data;
};

interface SignupResponse {
  message: string;
}
const register = async (signupFormData: SignupFormData): Promise<SignupResponse> => {
  const response = await API.post<SignupResponse>('/auth/register', {
    data: signupFormData,
  });
  return response.data;
};

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
