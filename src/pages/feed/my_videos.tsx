import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';
import MainLayout from '../../components/MainLayout';
import getAuthenticationToken from '../../helper/getAuthenticationToken';
import { redirect } from '../../helper/http';
import LoggedUserService from '../../service/logged-user.service';
import { RootState, wrapperRedux } from '../../store';
import { setFeedChannel } from '../../store/feed/actions';
import { ChannelDTO } from '../../types/channel';

const ChannelView = dynamic(() => import('../../containers/ChannelView'), { ssr: false });

interface MyVideosProps {
  channel: ChannelDTO | null;
}
const MyVideos: React.FC<MyVideosProps> = ({ channel }) => {
  return (
    <MainLayout>
      <Head>{/* <title>{channel?.name}</title> */}</Head>
      {channel && <ChannelView channel={channel} isOwnChannel />}
    </MainLayout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    channel: state.feedState.channel,
  };
};
export default connect(mapStateToProps)(MyVideos);

export const getServerSideProps: GetServerSideProps = wrapperRedux.getServerSideProps(
  async ({ req, res, store }) => {
    try {
      if (req) {
        const authenticationToken = getAuthenticationToken(req);
        if (authenticationToken) {
          const { channel, error } = await LoggedUserService.getMyChannel(authenticationToken);
          console.log(channel, error);
          if (!error && channel) {
            await store.dispatch(setFeedChannel(channel));
          } else {
            redirect(res);
            return;
          }
        }
      }
    } catch (error) {
      redirect(res);
    }
  },
);
