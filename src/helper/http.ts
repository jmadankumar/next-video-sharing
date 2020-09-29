import { ServerResponse } from 'http';

export function redirect(res: ServerResponse | undefined, location: string = '/') {
  if (res) {
    res.writeHead(302, { Location: location });
    res.end();
  }
}
