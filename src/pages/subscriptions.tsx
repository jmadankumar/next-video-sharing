import Head from 'next/head';
import Layout from '../components/Layout';
import Header from '../components/Layout/Header';
import SideBar from '../components/SiderBar';
import Main from '../components/Layout/Main';

const Susbscriptions = () => {
  return (
    <Layout>
      <Head>
        <title>Next Video Sharing</title>
      </Head>
      <Header />
      <SideBar />
      <Main className="bg-gray-100 flex-grow ">Susbscriptions</Main>
    </Layout>
  );
};

export default Susbscriptions;
