import { ServerResponse } from 'http';

export function redirect(res: ServerResponse, location: string = '/') {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}
