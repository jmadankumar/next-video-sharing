import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import { redirect } from '../helper/route';
import VideoService from '../service/video.service';
import { RootState } from '../store';
import { setWatchVideo } from '../store/watch/actions';
import { WatchState } from '../store/watch/types';

const DynamicVideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});

const WatchPage: NextPage = () => {
  const { video } = useSelector<RootState, WatchState>((state) => state.watchState);
  return (
    <MainLayout floatSideBar>
      <Head>
        <title>Watch</title>
      </Head>
      <div className="flex">
        <div className="xs:w-full sm:w-full md:w-full lg:w-8/12">
          {video && <DynamicVideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />}
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
};

WatchPage.getInitialProps = async ({ store, res, query }) => {
  const { v: id } = query;
  if (!id) {
    redirect(res);
  }
  try {
    const video = await VideoService.getVideoById(id as string);
    await store.dispatch(setWatchVideo(video));
  } catch (err) {
    redirect(res);
  }
};

export default WatchPage;
