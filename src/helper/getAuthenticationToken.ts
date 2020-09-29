import { IncomingMessage } from 'http';
import cookie from 'cookie';

const getAuthenticationToken = (req?: IncomingMessage) => {
  let authenticationToken = '';
  if (req?.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    return cookies.authentication_token;
  }
  return authenticationToken;
};

export default getAuthenticationToken;
