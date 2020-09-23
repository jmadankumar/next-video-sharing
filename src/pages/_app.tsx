import { AppProps } from 'next/app';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';
import { useEffect } from 'react';
import { wrapperRedux } from '../store';

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

export default wrapperRedux.withRedux(MyApp);
