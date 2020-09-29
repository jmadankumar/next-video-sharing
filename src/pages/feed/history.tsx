import { connect } from 'react-redux';
import Head from 'next/head';
import MainLayout from '../../components/MainLayout';
import withAuth from '../../hocs/withAuth';
import { RootState } from '../../store';

const History = () => {
  return (
    <MainLayout>
      <Head>
        <title>History</title>
      </Head>
    </MainLayout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    channel: state.feedState.channel,
  };
};

const ConnectedHistory = connect(mapStateToProps)(History);

export default withAuth(ConnectedHistory, '/login');
