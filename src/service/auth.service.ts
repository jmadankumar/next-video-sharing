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

const AuthService = {
  login,
};

export default AuthService;
