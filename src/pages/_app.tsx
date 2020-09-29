import App, { AppContext, AppProps } from 'next/app';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';
import { useEffect } from 'react';
import { wrapperRedux } from '../store';
import LoggedUserService from '../service/logged-user.service';
import getAuthenticationToken from '../helper/getAuthenticationToken';
import { setUser } from '../store/auth/actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setSubscriptions } from '../store/sidebar/actions';
import { SnackbarProvider } from 'notistack';
import { LocalMessage } from '../@types';

class MyApp extends App<AppProps> {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { req, store } = ctx;
  try {
    if (req) {
      const authenticationToken = getAuthenticationToken(req);
      if (authenticationToken) {
        const { user, subscriptions } = await LoggedUserService.getProfileDetail(
          authenticationToken,
        );
        await store.dispatch(setUser(user));
        await store.dispatch(setSubscriptions(subscriptions));

        const request = (req as unknown) as LocalMessage;
        request.locals = {};
        request.locals.authenticated = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};

export default wrapperRedux.withRedux(MyApp);
