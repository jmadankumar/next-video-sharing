import { ServerResponse } from 'http';

export function redirect(res: ServerResponse) {
  res.statusCode = 302;
  res.setHeader('Location', '/');
  res.end();
}
