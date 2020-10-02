import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/MainLayout';
import getAuthenticationToken from '../../helper/getAuthenticationToken';
import { redirect } from '../../helper/route';
import withAuth from '../../hocs/withAuth';
import LoggedUserService from '../../service/logged-user.service';
import { RootState } from '../../store';
import { setFeedChannel } from '../../store/feed/actions';
import { FeedState } from '../../store/feed/types';

const ChannelView = dynamic(() => import('../../containers/ChannelView'), { ssr: false });

const MyVideos: NextPage = () => {
  const { channel } = useSelector<RootState, FeedState>((state) => state.feedState);
  return (
    <MainLayout>
      <Head>{/* <title>{channel?.name}</title> */}</Head>
      {channel && <ChannelView channel={channel} isOwnChannel />}
    </MainLayout>
  );
};

export default withAuth(MyVideos, '/login');

MyVideos.getInitialProps = async ({ req, res, store }) => {
  try {
    const authenticationToken = getAuthenticationToken(req);
    const { channel, error } = await LoggedUserService.getMyChannel(authenticationToken);
    if (!error && channel) {
      await store.dispatch(setFeedChannel(channel));
    }
  } catch (error) {
    redirect(res);
  }
};
