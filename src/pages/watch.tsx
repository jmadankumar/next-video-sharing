import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';
import MainLayout from '../components/MainLayout';
import { redirect } from '../helper/http';
import VideoService from '../service/video.service';
import { RootState, wrapperRedux } from '../store';
import { setWatchVideo } from '../store/watch/actions';
import { VideoDTO } from '../types/video';

const DynamicVideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'), {
  ssr: false,
});
interface WatchPageProps {
  video: VideoDTO | null;
}

const WatchPage: React.FC<WatchPageProps> = ({ video }) => {
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

const mapStateToProps = (state: RootState) => {
  return {
    video: state.watchState.video,
  };
};

export default connect(mapStateToProps)(WatchPage);

export const getServerSideProps: GetServerSideProps = wrapperRedux.getServerSideProps(
  async ({ query, store, res }) => {
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
  },
);
