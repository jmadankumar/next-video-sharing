import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import VideoCard from '../components/VideoCard';
import VideoService from '../service/video.service';
import { VideoDTO } from '../types/video';
import Layout from '../components/Layout';
import Header from '../components/Layout/Header';
import SideBar from '../components/SiderBar';
import Main from '../components/Layout/Main';
import { RootState, wrapperRedux } from '../store';
import { setVideos } from '../store/home/actions';
import { connect } from 'react-redux';

interface HomeProps {
  videos: VideoDTO[];
}
const Home: React.FC<HomeProps> = ({ videos }) => {
  console.log(videos);
  return (
    <Layout>
      <Head>
        <title>Next Video Sharing</title>
      </Head>
      <Header />
      <SideBar />
      <Main className="bg-gray-100 flex-grow ">
        <div className="flex flex-wrap -mx-2">
          {videos.map((video) => (
            <div className="xs:w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-3" key={video.id}>
              <Link href={`/watch?v=${video.id}`}>
                <VideoCard videoDetail={video} className="cursor-pointer mb-8" />
              </Link>
            </div>
          ))}
        </div>
      </Main>
    </Layout>
  );
};

function mapStateToProps(state: RootState) {
  return {
    videos: state.homeState.videos,
  };
}

export default connect(mapStateToProps)(Home);

export const getServerSideProps: GetServerSideProps = wrapperRedux.getServerSideProps(
  async ({ store }) => {
    const videos = await VideoService.getAllVideo();
    await store.dispatch(setVideos(videos));
  },
);
