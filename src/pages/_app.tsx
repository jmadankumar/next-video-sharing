import App, { AppContext, AppProps } from 'next/app';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';
import { useEffect } from 'react';
import { wrapperRedux } from '../store';

import LoggedUserService from '../service/logged-user.service';
import getAuthenticationToken from '../helper/getAuthenticationToken';
import { setUser } from '../store/auth/actions';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
  }, []);
  return (
    <StylesProvider injectFirst>
      <Component {...pageProps} />
    </StylesProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const { req, store } = ctx;
  try {
    if (req) {
      const authenticationToken = getAuthenticationToken(req);
      if (authenticationToken) {
        const user = await LoggedUserService.getProfileDetail(authenticationToken);
        store.dispatch(setUser(user));
      }
    }
  } catch (error) {}
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};

export default wrapperRedux.withRedux(MyApp);
