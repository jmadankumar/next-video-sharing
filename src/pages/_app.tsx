import { AppProps } from 'next/app';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <Component {...pageProps} />
    </StylesProvider>
  );
}

export default MyApp;
