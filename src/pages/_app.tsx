import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Header from '../components/Layout/Header';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </StylesProvider>
  );
}

export default MyApp;
