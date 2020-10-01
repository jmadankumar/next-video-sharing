import { connect, useSelector } from 'react-redux';
import Head from 'next/head';
import MainLayout from '../../components/MainLayout';
import withAuth from '../../hocs/withAuth';
import { RootState } from '../../store';
import { FeedState } from '../../store/feed/types';

const History = () => {
  const { channel } = useSelector<RootState, FeedState>((state) => state.feedState);
  return (
    <MainLayout>
      <Head>
        <title>History</title>
      </Head>
    </MainLayout>
  );
};

export default withAuth(History, '/login');
