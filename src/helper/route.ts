import { ServerResponse } from 'http';
import Router from 'next/router';

export function redirect(res: ServerResponse | undefined, location: string = '/') {
  if (res) {
    res.writeHead(302, { Location: location });
    res.end();
  } else {
    Router.push(location);
  }
}
