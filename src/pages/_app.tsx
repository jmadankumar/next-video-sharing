import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Header from '../components/Layout/Header';
import { StylesProvider } from '@material-ui/core';
import '../styles/globals.css';
import 'tailwindcss/dist/tailwind.min.css';
import SideBar from '../components/SiderBar';
import Main from '../components/Layout/Main';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider injectFirst>
      <Layout>
        <Header />
        <SideBar />
        <Main className="flex-grow">
          <Component {...pageProps} />
        </Main>
      </Layout>
    </StylesProvider>
  );
}

export default MyApp;
