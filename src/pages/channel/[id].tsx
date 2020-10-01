import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/MainLayout';
import { redirect } from '../../helper/route';
import ChannelService from '../../service/channel.service';
import { RootState } from '../../store';
import { setChannel } from '../../store/channel/actions';
import { ChannelState } from '../../store/channel/types';

const ChannelView = dynamic(() => import('../../containers/ChannelView'), { ssr: false });

const ChannelPage: NextPage = () => {
  const { channel } = useSelector<RootState, ChannelState>((state) => state.channelState);
  return (
    <MainLayout>
      <Head>
        <title>{channel?.name}</title>
      </Head>
      {channel && <ChannelView channel={channel} isOwnChannel={false} />}
    </MainLayout>
  );
};

ChannelPage.getInitialProps = async ({ query, res, store }) => {
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
};

export default ChannelPage;
