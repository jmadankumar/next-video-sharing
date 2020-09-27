import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';
import MainLayout from '../../components/MainLayout';
import { redirect } from '../../helper/http';
import ChannelService from '../../service/channel.service';
import { RootState, wrapperRedux } from '../../store';
import { setChannel } from '../../store/channel/actions';
import { ChannelDTO } from '../../types/channel';

const ChannelView = dynamic(() => import('../../containers/ChannelView'), { ssr: false });

interface ChannelPageProps {
  channel: ChannelDTO | null;
}
const ChannelPage: React.FC<ChannelPageProps> = ({ channel }) => {
  const router = useRouter();
  return (
    <MainLayout>
      <Head>
        <title>{channel?.name}</title>
      </Head>
      {channel && <ChannelView channel={channel} isOwnChannel={false} />}
    </MainLayout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    channel: state.channelState.channel,
  };
};
export default connect(mapStateToProps)(ChannelPage);

export const getServerSideProps: GetServerSideProps = wrapperRedux.getServerSideProps(
  async ({ query, res, store }) => {
    const { id } = query;
    if (!id) {
      redirect(res);
    }
    const { channel, error } = await ChannelService.getChannelById(id as string);
    if (!error && channel) {
      await store.dispatch(setChannel(channel));
    } else {
      redirect(res);
    }
  },
);
