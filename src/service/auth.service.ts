import API from '../helper/api';
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
const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

interface LogoutResponse {
  message: string;
}

const logout = async (): Promise<LogoutResponse> => {
  const response = await API.post<LogoutResponse>('/auth/logout');
  return response.data;
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
