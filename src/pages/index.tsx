import { GetServerSideProps, NextPage } from 'next';
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
import { connect, useSelector } from 'react-redux';
import { UserDTO } from '../types/user';

const Home: NextPage = () => {
  const {
    authState: { user },
    homeState: { videos },
  } = useSelector<RootState, RootState>((state) => state);
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
              <Link href={`/watch?v=${video.id}`} passHref>
                <a>
                  <VideoCard videoDetail={video} className="cursor-pointer mb-8" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </Main>
    </Layout>
  );
};

Home.getInitialProps = async ({ store }) => {
  const videos = await VideoService.getAllVideo();
  await store.dispatch(setVideos(videos));
};

export default Home;