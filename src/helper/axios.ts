import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message;
};
