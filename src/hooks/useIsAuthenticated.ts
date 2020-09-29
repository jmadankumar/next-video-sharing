import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthState } from '../store/auth/types';

export default function useIsAuthenticated() {
  const { authenticated } = useSelector<RootState, AuthState>((state) => state.authState);

  return authenticated;
}
